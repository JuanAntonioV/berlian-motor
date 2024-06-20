'use server';

import db from '@/lib/db';
import {
  changeStaffPasswordSchema,
  staffSchema,
  updateStaffSchema,
} from '@/lib/validations';
import path from 'path';
import fs from 'fs/promises';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { hash } from 'bcryptjs';
import { ServerErrorException } from '@/lib/exceptions';

export async function createStaffAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const image = formData.get('image') as File;
  const role = formData.get('role') as string;
  const joinedDate = formData.get('joinedDate') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validate = staffSchema.safeParse({
    email,
    name,
    password,
    image,
    confirmPassword,
    role,
    joinedDate,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  try {
    // check email is Exist
    const findEmail = db.user.findFirst({
      where: {
        email,
      },
    });

    const findRole = db.roles.findFirst({
      where: {
        id: parseInt(role),
      },
    });

    const [isExist, isRoleExist] = await Promise.all([findEmail, findRole]);

    if (isExist) {
      return {
        errors: {
          email: 'Email sudah terdaftar',
        },
      };
    }

    if (password !== confirmPassword) {
      return {
        errors: {
          confirmPassword: 'Kata sandi tidak sama',
        },
      };
    }

    if (!isRoleExist) {
      return {
        errors: {
          role: 'Role tidak valid',
        },
      };
    }

    const userData = await db.user.create({
      data: {
        email,
        name,
        password,
        joinDate: new Date(joinedDate),
        status: true,
      },
      select: {
        id: true,
      },
    });

    // asign role
    await db.userRoles.create({
      data: {
        userId: userData.id,
        roleId: parseInt(role),
      },
    });

    // save image to /public/images
    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${image.name}`;
      const filePath = `${uploadDir}/${newFileName}`;

      const bytes = await image.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(bytes));

      await db.user.update({
        where: {
          id: userData.id,
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

  revalidatePath('/kelola-karyawan');
  redirect('/kelola-karyawan');
}

export async function updateStaffAction(prevState: any, formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const image: File | null = formData.get('image') as unknown as File | null;
  const role = formData.get('role') as string;
  const joinedDate = formData.get('joinedDate') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const status = formData.get('status') as string;

  const validate = updateStaffSchema.safeParse({
    email,
    name,
    password,
    image,
    confirmPassword,
    role,
    joinedDate,
    status: status === 'on' ? true : false,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    redirect('/not-found');
  }

  try {
    // check email is Exist
    const findEmail = db.user.findFirst({
      where: {
        email,
        NOT: {
          id,
        },
      },
    });

    const findRole = db.roles.findFirst({
      where: {
        id: parseInt(role),
      },
    });

    const [isExist, isRoleExist] = await Promise.all([findEmail, findRole]);

    if (isExist) {
      return {
        errors: {
          email: 'Email sudah terdaftar',
        },
      };
    }

    if (password !== confirmPassword) {
      return {
        errors: {
          confirmPassword: 'Kata sandi tidak sama',
        },
      };
    }

    if (!isRoleExist) {
      return {
        errors: {
          role: 'Role tidak valid',
        },
      };
    }

    await db.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        status: status === 'on' ? true : false,
        joinDate: new Date(joinedDate),
      },
    });

    // asign role
    await db.userRoles.deleteMany({
      where: {
        userId: id,
      },
    });

    await db.userRoles.create({
      data: {
        userId: id,
        roleId: parseInt(role),
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
          id,
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

  revalidatePath('/kelola-karyawan');
  redirect('/kelola-karyawan');
}

export async function changeStaffPasswordAction(
  prevState: any,
  formData: FormData
) {
  const id = parseInt(formData.get('id') as string);
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validate = changeStaffPasswordSchema.safeParse({
    password,
    confirmPassword,
  });

  if (!validate.success) {
    return { error: validate.error.flatten().fieldErrors };
  }

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: 'Kata sandi tidak sama',
      },
    };
  }

  try {
    const hashedPassword = await hash(password, 10);

    await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath('/kelola-karyawan');

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
}

export async function deleteStaffAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      redirect('/not-found');
    }

    if (user.image) {
      const image = path.join(process.cwd(), 'public', user.image);
      const isExist = await fs.stat(image);

      if (isExist) {
        await fs.unlink(image);
      }
    }

    await db.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (err: any) {
    console.error('Error: ', err.message);
    throw new ServerErrorException(err.message);
  }
  redirect('/kelola-karyawan');
}
