'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { transferSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';
import { getTransferId } from '@/getters/transferGetter';
import { auth } from '@/lib/auth';

export async function createTransferAction(prevState: any, formData: FormData) {
  let invoiceNumber = formData.get('invoiceNumber') as string;
  const attachment: File | null = formData.get('attachment') as unknown as File;
  const notes = formData.get('notes') as string;
  const sku = formData.get('sku') as string;
  const supplier = formData.get('supplier') as string;
  const shelfId = formData.get('shelfId') as string;
  const shelfToId = formData.get('shelfToId') as string;
  const reference = formData.get('reference') as string;
  const quantity = formData.get('quantity') as string;

  const validate = transferSchema.safeParse({
    invoiceNumber,
    attachment,
    notes,
    shelfId,
    shelfToId,
    sku,
    supplier,
    reference,
    quantity: parseInt(quantity),
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!invoiceNumber) {
    invoiceNumber = await getTransferId();
  }

  try {
    const findProduct = await db.product.findFirst({
      where: {
        sku,
      },
    });

    if (!findProduct) {
      return {
        error: {
          message: 'Produk tidak ditemukan',
        },
      };
    }

    const findShelf = await db.shelf.findFirst({
      where: {
        id: parseInt(shelfId),
      },
    });
    const findShelfTo = await db.shelf.findFirst({
      where: {
        id: parseInt(shelfToId),
      },
    });

    if (!findShelf || !findShelfTo) {
      return {
        error: {
          message: 'Rak tidak ditemukan',
        },
      };
    }

    const session = await auth();
    const user = session?.user;

    const transferData = await db.transfer.create({
      data: {
        invoiceNumber,
        notes,
        productId: findProduct.id,
        storeId: 1,
        userId: parseInt(user?.id!),
        shelfId: parseInt(shelfId),
        shelfToId: parseInt(shelfToId),
        reference,
        quantity: parseInt(quantity),
      },
    });

    // add stock
    const productStocks = await db.productStock.findFirst({
      where: {
        productId: findProduct.id,
        storeId: 1,
        shelfId: parseInt(shelfId),
      },
    });
    const productStockTo = await db.productStock.findFirst({
      where: {
        productId: findProduct.id,
        storeId: 1,
        shelfId: parseInt(shelfToId),
      },
    });

    if (productStocks) {
      const remainingStock = productStocks.quantity - parseInt(quantity);

      if (remainingStock < 0) {
        return {
          error: {
            message: 'Stok tidak cukup',
          },
        };
      }

      await db.productStock.update({
        where: {
          id: productStocks.id,
          productId: findProduct.id,
          storeId: 1,
          shelfId: parseInt(shelfId),
        },
        data: {
          quantity: remainingStock,
        },
      });
    } else {
      return {
        error: {
          message: 'Stok tidak cukup',
        },
      };
    }

    if (productStockTo) {
      const remainingStock = productStockTo.quantity + parseInt(quantity);

      await db.productStock.update({
        where: {
          id: productStockTo.id,
          productId: findProduct.id,
          storeId: 1,
          shelfId: parseInt(shelfToId),
        },
        data: {
          quantity: remainingStock,
        },
      });
    } else {
      await db.productStock.create({
        data: {
          productId: findProduct.id,
          storeId: 1,
          shelfId: parseInt(shelfToId),
          quantity: parseInt(quantity),
        },
      });
    }

    if (attachment && attachment.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${attachment.name}`;
      const filePath = `${uploadDir}/${newFileName}`;

      const bytes = await attachment.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(bytes));

      await db.transfer.update({
        where: {
          id: transferData.id,
        },
        data: {
          attachment: `/uploads/${newFileName}`,
        },
      });
    }
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }

  revalidatePath('/transfer-barang');
  redirect('/transfer-barang');
}
