'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { goodsReceiptSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';
import { getGoodsReceiptId } from '@/getters/goodsReceiptGetter';
import { auth } from '@/lib/auth';

export async function createGoodsReceiptAction(
  prevState: any,
  formData: FormData
) {
  let invoiceNumber = formData.get('invoiceNumber') as string;
  const attachment: File | null = formData.get('attachment') as unknown as File;
  const notes = formData.get('notes') as string;
  const sku = formData.get('sku') as string;
  const supplier = formData.get('supplier') as string;
  const shelfId = formData.get('shelfId') as string;
  const reference = formData.get('reference') as string;
  const quantity = formData.get('quantity') as string;

  const validate = goodsReceiptSchema.safeParse({
    invoiceNumber,
    attachment,
    notes,
    shelfId,
    sku,
    supplier,
    reference,
    quantity: parseInt(quantity),
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!invoiceNumber) {
    invoiceNumber = await getGoodsReceiptId();
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
          sku: 'Produk tidak ditemukan',
        },
      };
    }

    const findShelf = await db.shelf.findFirst({
      where: {
        id: parseInt(shelfId),
      },
    });

    if (!findShelf) {
      return {
        error: {
          shelfId: 'Rak tidak ditemukan',
        },
      };
    }

    const session = await auth();
    const user = session?.user;

    const goodsReceiptData = await db.goodsReceipt.create({
      data: {
        invoiceNumber,
        notes,
        productId: findProduct.id,
        storeId: 1,
        userId: parseInt(user?.id!),
        supplier,
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

    if (productStocks) {
      await db.productStock.update({
        where: {
          id: productStocks.id,
          shelfId: parseInt(shelfId),
          storeId: 1,
        },
        data: {
          quantity: productStocks.quantity + parseInt(quantity),
        },
      });
    } else {
      await db.productStock.create({
        data: {
          productId: findProduct.id,
          storeId: 1,
          shelfId: parseInt(shelfId),
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

      await db.goodsReceipt.update({
        where: {
          id: goodsReceiptData.id,
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

  revalidatePath('/penerimaan-barang');
  redirect('/penerimaan-barang');
}
