'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { categorySchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCategoryAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;

  const validate = categorySchema.safeParse({
    name,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const findCategory = await db.category.findFirst({
      where: {
        name,
      },
    });

    if (findCategory) {
      return {
        errors: {
          name: 'Kategori sudah terdaftar',
        },
      };
    }

    await db.category.create({
      data: {
        name,
      },
    });

    revalidatePath('/kelola-kategori');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function updateCategoryAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  const validate = categorySchema.safeParse({
    name,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!id) {
    redirect('/not-found');
  }

  try {
    const user = await db.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      redirect('/not-found');
    }

    await db.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    revalidatePath('/kelola-kategori');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function deleteCategoryAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const user = await db.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      redirect('/not-found');
    }

    const products = await db.product.findMany({
      where: {
        Category: {
          some: {
            id: parseInt(id),
          },
        },
      },
    });

    if (products.length > 0) {
      return {
        error: {
          message: 'Kategori tidak bisa dihapus karena masih digunakan',
        },
      };
    }

    await db.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath('/kelola-kategori');
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}
