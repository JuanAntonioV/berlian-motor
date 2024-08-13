'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { shelfSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';

export async function createShelfAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const image: File | null = formData.get('image') as unknown as File;
  const description = formData.get('description') as string;

  const validate = shelfSchema.safeParse({
    name,
    image,
    description,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const findShelf = await db.shelf.findFirst({
      where: {
        name,
      },
    });

    if (findShelf) {
      return {
        errors: {
          name: 'Rak sudah terdaftar',
        },
      };
    }

    const shelf = await db.shelf.create({
      data: {
        name,
        description,
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

      await db.shelf.update({
        where: {
          id: shelf.id,
        },
        data: {
          image: `/uploads/${newFileName}`,
        },
      });
    }

    revalidatePath('/kelola-rak');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function updateShelfAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const status = formData.get('status') === 'on' ? true : false;
  const image: File | null = formData.get('image') as unknown as File;
  const description = formData.get('description') as string;

  const validate = shelfSchema.safeParse({
    name,
    image,
    description,
    status,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!id) {
    redirect('/not-found');
  }

  try {
    const shelf = await db.shelf.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!shelf) {
      redirect('/not-found');
    }

    await db.shelf.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        status,
        description,
      },
    });

    if (image && image.size > 0) {
      if (shelf?.image) {
        const oldImage = path.join(process.cwd(), 'public', shelf.image);
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

      await db.shelf.update({
        where: {
          id: parseInt(id),
        },
        data: {
          image: `/uploads/${newFileName}`,
        },
      });
    }

    revalidatePath('/kelola-rak');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function deleteShelfAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const shelf = await db.shelf.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!shelf) {
      redirect('/not-found');
    }

    const productStock = await db.productStock.findMany({
      where: {
        shelfId: parseInt(id),
      },
    });

    if (productStock.length > 0) {
      return {
        error: {
          message: 'Rak masih memiliki stok produk',
        },
      };
    }

    const reductionGoods = await db.reductionOfGoods.findMany({
      where: {
        shelfId: parseInt(id),
      },
    });

    if (reductionGoods.length > 0) {
      return {
        error: {
          message: 'Rak masih memiliki stok barang keluar',
        },
      };
    }

    const transferGoods = await db.transfer.findMany({
      where: {
        shelfId: parseInt(id),
      },
    });

    if (transferGoods.length > 0) {
      return {
        error: {
          message: 'Rak masih memiliki stok barang pindah',
        },
      };
    }

    const stockAdjustment = await db.stockAdjustment.findMany({
      where: {
        shelfId: parseInt(id),
      },
    });

    if (stockAdjustment.length > 0) {
      return {
        error: {
          message: 'Rak masih memiliki stok barang',
        },
      };
    }

    await db.shelf.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath('/kelola-rak');
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}
