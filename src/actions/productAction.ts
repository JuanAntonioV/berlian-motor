'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { productSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';
import { parseRupiah } from '@/lib/formaters';

export async function createProductAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const image: File | null = formData.get('image') as unknown as File;
  const description = formData.get('description') as string;
  let sku = formData.get('sku') as string;
  const type = formData.get('type') as string;
  const salePrice = formData.get('salePrice') as string;
  const supplierPrice = formData.get('supplierPrice') as string;
  const wholesalePrice = formData.get('wholesalePrice') as string;
  const retailPrice = formData.get('retailPrice') as string;
  const workshopPrice = formData.get('workshopPrice') as string;
  const brand = formData.get('brand') as string;
  const categories = formData.get('categories') as string;

  const validate = productSchema.safeParse({
    name,
    description,
    sku,
    type,
    salePrice: parseRupiah(salePrice),
    supplierPrice: parseRupiah(supplierPrice),
    wholesalePrice: parseRupiah(wholesalePrice),
    retailPrice: parseRupiah(retailPrice),
    workshopPrice: parseRupiah(workshopPrice),
    brand,
    categories,
    image,
  });

  if (!validate.success) {
    return { errors: validate.error.flatten().fieldErrors };
  }

  if (!sku) {
    sku = await generateSKU();
  }

  try {
    const findProduct = db.product.findFirst({
      where: {
        name,
      },
    });
    const findSku = db.product.findFirst({
      where: {
        sku,
      },
    });

    const [isNameExist, isSkuExist] = await Promise.all([findProduct, findSku]);

    if (isNameExist) {
      return {
        message: 'Produk sudah terdaftar',
      };
    }

    if (isSkuExist) {
      return {
        message: 'SKU sudah terdaftar',
      };
    }

    const productData = await db.product.create({
      data: {
        name,
        description,
        sku,
        typeId: parseInt(type),
        salePrice: parseRupiah(salePrice),
        supplierPrice: parseRupiah(supplierPrice),
        wholesalePrice: parseRupiah(wholesalePrice),
        retailPrice: parseRupiah(retailPrice),
        workshopPrice: parseRupiah(workshopPrice),
        brandId: parseRupiah(brand),
        Category: {
          connect: categories.split(',').map((category) => ({
            id: parseInt(category),
          })),
        },
      },
    });

    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${image.name}`;
      const filePath = `${uploadDir}/${newFileName}`;

      const bytes = await image.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(bytes));

      await db.product.update({
        where: {
          id: productData.id,
        },
        data: {
          image: `/uploads/${newFileName}`,
        },
      });
    }
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }

  revalidatePath('/kelola-produk');
  redirect('/kelola-produk');
}

export async function updateProductAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const image: File | null = formData.get('image') as unknown as File;
  const description = formData.get('description') as string;
  // const sku = formData.get('sku') as string;
  const type = formData.get('type') as string;
  const salePrice = formData.get('salePrice') as string;
  const supplierPrice = formData.get('supplierPrice') as string;
  const wholesalePrice = formData.get('wholesalePrice') as string;
  const retailPrice = formData.get('retailPrice') as string;
  const workshopPrice = formData.get('workshopPrice') as string;
  const brand = formData.get('brand') as string;
  const categories = formData.get('categories') as string;

  const validate = productSchema.safeParse({
    name,
    description,
    // sku,
    type,
    salePrice: parseRupiah(salePrice),
    supplierPrice: parseRupiah(supplierPrice),
    wholesalePrice: parseRupiah(wholesalePrice),
    retailPrice: parseRupiah(retailPrice),
    workshopPrice: parseRupiah(workshopPrice),
    brand,
    categories,
    image,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!id) {
    redirect('/not-found');
  }

  const product = await db.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    redirect('/not-found');
  }

  try {
    await db.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        // sku,
        typeId: parseInt(type),
        salePrice: parseRupiah(salePrice),
        supplierPrice: parseRupiah(supplierPrice),
        wholesalePrice: parseRupiah(wholesalePrice),
        retailPrice: parseRupiah(retailPrice),
        workshopPrice: parseRupiah(workshopPrice),
        brandId: parseInt(brand),
        Category: {
          set: categories.split(',').map((category) => ({
            id: parseInt(category),
          })),
        },
      },
    });

    if (image && image.size > 0) {
      if (product?.image) {
        const oldImage = path.join(process.cwd(), 'public', product.image);
        const isExist = await fs.stat(oldImage);

        if (isExist) {
          await fs.unlink(oldImage);
        }
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${image.name}`;
      const filePath = `${uploadDir}/${newFileName}`;

      const bytes = await image.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(bytes));

      await db.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          image: `/uploads/${newFileName}`,
        },
      });
    }
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }

  revalidatePath('/kelola-produk');
  redirect('/kelola-produk');
}

export async function deleteProductAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const product = await db.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      redirect('/not-found');
    }

    const stock = await db.productStock.findFirst({
      where: {
        productId: parseInt(id),
        quantity: {
          gt: 0,
        },
      },
    });

    if (stock) {
      return {
        error: {
          message: 'Produk tidak bisa dihapus karena masih memiliki stok',
        },
      };
    }

    const goods = await db.goodsReceipt.findFirst({
      where: {
        productId: parseInt(id),
      },
    });

    if (goods) {
      return {
        error: {
          message:
            'Produk tidak bisa dihapus karena masih memiliki transaksi barang masuk',
        },
      };
    }

    const reductionGoods = await db.reductionOfGoods.findFirst({
      where: {
        productId: parseInt(id),
      },
    });

    if (reductionGoods) {
      return {
        error: {
          message:
            'Produk tidak bisa dihapus karena masih memiliki transaksi pengurangan barang',
        },
      };
    }

    const transferGoods = await db.transfer.findFirst({
      where: {
        productId: parseInt(id),
      },
    });

    if (transferGoods) {
      return {
        error: {
          message:
            'Produk tidak bisa dihapus karena masih memiliki transaksi transfer barang',
        },
      };
    }

    const stockAdjustment = await db.stockAdjustment.findFirst({
      where: {
        productId: parseInt(id),
      },
    });

    if (stockAdjustment) {
      return {
        error: {
          message:
            'Produk tidak bisa dihapus karena masih memiliki transaksi penyesuaian stok',
        },
      };
    }

    await db.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath('/kelola-produk');
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function generateSKU() {
  // make it like this SK-0001
  const prefix = 'SK';
  const lastId = await db.product.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  if (!lastId) {
    return `${prefix}-0001`;
  }

  // get the last 0001 from sku
  const lastSKU = lastId.sku.split('-')[1];
  // increment the last 0001
  const number = ('000' + (parseInt(lastSKU) + 1)).slice(-4);

  // check if sku already exist
  const sku = await db.product.findFirst({
    where: {
      sku: `${prefix}-${number}`,
    },
  });

  if (sku) {
    generateSKU();
  }

  return `${prefix}-${number}`;
}
