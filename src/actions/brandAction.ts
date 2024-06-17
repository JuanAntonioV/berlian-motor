'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { brandSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBrandAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;

  const validate = brandSchema.safeParse({
    name,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const findBrand = await db.brand.findFirst({
      where: {
        name,
      },
    });

    if (findBrand) {
      return {
        errors: {
          name: 'Kategori sudah terdaftar',
        },
      };
    }

    await db.brand.create({
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

export async function updateBrandAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  const validate = brandSchema.safeParse({
    name,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!id) {
    redirect('/not-found');
  }

  try {
    const user = await db.brand.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      redirect('/not-found');
    }

    await db.brand.update({
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

export async function deleteBrandAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const user = await db.brand.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      redirect('/not-found');
    }

    await db.brand.delete({
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
