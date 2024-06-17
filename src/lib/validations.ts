import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email wajib diisi',
      invalid_type_error: 'Email tidak valid',
      message: 'Email tidak valid',
    })
    .email('Email tidak valid')
    .min(1, 'Email wajib diisi')
    .max(45, 'Email maksimal 45 karakter'),
  password: z
    .string({
      required_error: 'Kata sandi wajib diisi',
      invalid_type_error: 'Kata sandi tidak valid',
      message: 'Kata sandi tidak valid',
    })
    .min(6, 'Kata sandi minimal 6 karakter')
    .max(45, 'Kata sandi maksimal 45 karakter'),
});

export const staffSchema = z
  .object({
    image: z
      .instanceof(File, {
        message: 'Foto tidak valid',
      })
      .refine((data) => {
        if (!data || data?.size === 0) return true;
        return data.size < 5 * 1024 * 1024;
      }, 'Ukuran foto maksimal 5MB')
      .refine((data) => {
        if (!data || data?.size === 0) return true;
        const types = ['image/png', 'image/jpg', 'image/jpeg'];
        return types.includes(data.type);
      }, 'Foto harus berupa file gambar')
      .optional()
      .nullable(),
    email: z
      .string({
        required_error: 'Email wajib diisi',
        invalid_type_error: 'Email tidak valid',
        message: 'Email tidak valid',
      })
      .email('Email tidak valid')
      .min(1, 'Email wajib diisi')
      .max(45, 'Email maksimal 45 karakter'),
    name: z
      .string({
        required_error: 'Nama wajib diisi',
        invalid_type_error: 'Nama tidak valid',
        message: 'Nama tidak valid',
      })
      .min(1, 'Nama wajib diisi')
      .max(255, 'Nama maksimal 255 karakter'),
    role: z.string({
      required_error: 'Role wajib diisi',
      invalid_type_error: 'Role tidak valid',
      message: 'Role tidak valid',
    }),
    joinedDate: z
      .string({
        required_error: 'Tanggal bergabung wajib diisi',
        invalid_type_error: 'Tanggal bergabung tidak valid',
        message: 'Tanggal bergabung tidak valid',
      })
      .nullable(),
    password: z
      .string({
        required_error: 'Kata sandi wajib diisi',
        invalid_type_error: 'Kata sandi tidak valid',
        message: 'Kata sandi tidak valid',
      })
      .min(6, 'Kata sandi minimal 6 karakter')
      .max(45, 'Kata sandi maksimal 45 karakter'),
    confirmPassword: z
      .string({
        required_error: 'Konfirmasi kata sandi wajib diisi',
        invalid_type_error: 'Konfirmasi kata sandi tidak valid',
        message: 'Konfirmasi kata sandi tidak valid',
      })
      .min(6, 'Konfirmasi kata sandi minimal 6 karakter')
      .max(45, 'Konfirmasi kata sandi maksimal 45 karakter'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak sama',
    path: ['confirmPassword'],
  });

export const updateStaffSchema = z.object({
  image: z
    .instanceof(File, {
      message: 'Foto tidak valid',
    })
    .refine((data) => {
      if (!data || data?.size === 0) return true;
      return data.size < 5 * 1024 * 1024;
    }, 'Ukuran foto maksimal 5MB')
    .refine((data) => {
      if (!data || data?.size === 0) return true;
      const types = ['image/png', 'image/jpg', 'image/jpeg'];
      return types.includes(data.type);
    }, 'Foto harus berupa file gambar')
    .optional()
    .nullable(),
  email: z
    .string({
      required_error: 'Email wajib diisi',
      invalid_type_error: 'Email tidak valid',
      message: 'Email tidak valid',
    })
    .email('Email tidak valid')
    .min(1, 'Email wajib diisi')
    .max(45, 'Email maksimal 45 karakter'),
  name: z
    .string({
      required_error: 'Nama wajib diisi',
      invalid_type_error: 'Nama tidak valid',
      message: 'Nama tidak valid',
    })
    .min(1, 'Nama wajib diisi')
    .max(255, 'Nama maksimal 255 karakter'),
  role: z.string({
    required_error: 'Role wajib diisi',
    invalid_type_error: 'Role tidak valid',
    message: 'Role tidak valid',
  }),
  joinedDate: z
    .string({
      required_error: 'Tanggal bergabung wajib diisi',
      invalid_type_error: 'Tanggal bergabung tidak valid',
      message: 'Tanggal bergabung tidak valid',
    })
    .nullable(),
  status: z.boolean({
    required_error: 'Status wajib diisi',
    invalid_type_error: 'Status tidak valid',
    message: 'Status tidak valid',
  }),
});

export const changeStaffPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Kata sandi wajib diisi',
        invalid_type_error: 'Kata sandi tidak valid',
        message: 'Kata sandi tidak valid',
      })
      .min(6, 'Kata sandi minimal 6 karakter')
      .max(45, 'Kata sandi maksimal 45 karakter'),
    confirmPassword: z.string({
      required_error: 'Konfirmasi kata sandi wajib diisi',
      invalid_type_error: 'Konfirmasi kata sandi tidak valid',
      message: 'Konfirmasi kata sandi tidak valid',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak sama',
    path: ['confirmPassword'],
  });

export const categorySchema = z.object({
  name: z
    .string({
      required_error: 'Nama wajib diisi',
      invalid_type_error: 'Nama tidak valid',
      message: 'Nama tidak valid',
    })
    .min(1, 'Nama kategori tidak boleh kosong')
    .max(255, 'Nama maksimal 255 karakter'),
});
