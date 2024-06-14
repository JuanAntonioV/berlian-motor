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
