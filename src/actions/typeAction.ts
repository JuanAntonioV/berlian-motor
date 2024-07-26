'use server';

import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { typesSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTypesAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;

  const validate = typesSchema.safeParse({
    name,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const findTypes = await db.types.findFirst({
      where: {
        name,
      },
    });

    if (findTypes) {
      return {
        errors: {
          name: 'Tipe sudah terdaftar',
        },
      };
    }

    await db.types.create({
      data: {
        name,
      },
    });

    revalidatePath('/kelola-tipe');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function updateTypesAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  const validate = typesSchema.safeParse({
    name,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (!id) {
    redirect('/not-found');
  }

  try {
    const types = await db.types.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!types) {
      redirect('/not-found');
    }

    await db.types.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    revalidatePath('/kelola-tipe');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function deleteTypesAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const types = await db.types.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!types) {
      redirect('/not-found');
    }

    await db.types.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath('/kelola-tipe');
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}
