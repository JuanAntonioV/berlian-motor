'use server';

import { signIn, signOut } from '@/lib/auth';
import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import {
  changePasswordSchema,
  changeProfileSchema,
  loginSchema,
} from '@/lib/validations';
import { compare, hash } from 'bcryptjs';
import path from 'path';
import fs from 'fs/promises';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validate = loginSchema.safeParse({ email, password });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: { message: 'Email atau password salah' } };
  }
}

export async function logoutAction(formData: FormData) {
  await signOut({
    redirect: true,
    redirectTo: '/auth/login',
  });
}

export async function changePasswordAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const oldPassword = formData.get('oldPassword') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validate = changePasswordSchema.safeParse({
    oldPassword,
    password,
    confirmPassword,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const user = await db.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new Error('Unauthorized');
    }

    const isValid = await compare(oldPassword, user.password as string);

    if (!isValid) {
      return {
        error: {
          oldPassword: 'Kata sandi lama tidak cocok',
        },
      };
    }

    await db.user.update({
      where: { id: Number(id) },
      data: {
        password: await hash(password, 10),
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}

export async function changeProfileAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const image: File | null = formData.get('image') as File | null;

  const validate = changeProfileSchema.safeParse({
    name,
    email,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    const user = await db.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new Error('Unauthorized');
    }

    if (user.email !== email) {
      const isExist = await db.user.findFirst({
        where: {
          email,
        },
      });

      if (isExist) {
        return {
          error: {
            email: 'Email sudah digunakan',
          },
        };
      }
    }

    await db.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
      },
    });

    if (image && image.size > 0) {
      if (user?.image) {
        const oldImage = path.join(process.cwd(), 'public', user.image);
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

      await db.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          image: `/uploads/${newFileName}`,
        },
      });
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    throw new ServerErrorException(err.message);
  }
}
