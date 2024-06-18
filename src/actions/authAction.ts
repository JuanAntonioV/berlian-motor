'use server';

import { signIn, signOut } from '@/lib/auth';
import db from '@/lib/db';
import { ServerErrorException } from '@/lib/exceptions';
import { changePasswordSchema, loginSchema } from '@/lib/validations';
import { compare, hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validate = loginSchema.safeParse({ email, password });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  await signIn('credentials', {
    email,
    password,
    redirect: true,
    redirectTo: '/dashboard',
  });
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
