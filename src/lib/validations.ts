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
    .min(1, 'Nama tidak boleh kosong')
    .max(255, 'Nama maksimal 255 karakter'),
});

export const brandSchema = z.object({
  name: z
    .string({
      required_error: 'Nama wajib diisi',
      invalid_type_error: 'Nama tidak valid',
      message: 'Nama tidak valid',
    })
    .min(1, 'Nama tidak boleh kosong')
    .max(255, 'Nama maksimal 255 karakter'),
});

export const shelfSchema = z.object({
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
  name: z
    .string({
      required_error: 'Nama wajib diisi',
      invalid_type_error: 'Nama tidak valid',
      message: 'Nama tidak valid',
    })
    .min(1, 'Nama tidak boleh kosong')
    .max(255, 'Nama maksimal 255 karakter'),
  description: z
    .string({
      required_error: 'Deskripsi wajib diisi',
      invalid_type_error: 'Deskripsi tidak valid',
      message: 'Deskripsi tidak valid',
    })
    .nullable(),
  status: z
    .boolean({
      required_error: 'Status wajib diisi',
      invalid_type_error: 'Status tidak valid',
      message: 'Status tidak valid',
    })
    .optional()
    .nullable(),
});

export const productSchema = z.object({
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
  name: z
    .string({
      required_error: 'Nama wajib diisi',
      invalid_type_error: 'Nama tidak valid',
      message: 'Nama tidak valid',
    })
    .min(1, 'Nama tidak boleh kosong')
    .max(255, 'Nama maksimal 255 karakter'),
  description: z
    .string({
      required_error: 'Deskripsi wajib diisi',
      invalid_type_error: 'Deskripsi tidak valid',
      message: 'Deskripsi tidak valid',
    })
    .nullable(),
  sku: z
    .string({
      required_error: 'Kode SKU wajib diisi',
      invalid_type_error: 'Kode SKU tidak valid',
      message: 'Kode SKU tidak valid',
    })
    .optional()
    .nullable(),
  type: z
    .string({
      required_error: 'Tipe wajib diisi',
      invalid_type_error: 'Tipe tidak valid',
      message: 'Tipe tidak valid',
    })
    .nullable(),
  categories: z
    .string({
      required_error: 'Kategori wajib diisi',
      invalid_type_error: 'Kategori tidak valid',
      message: 'Kategori tidak valid',
    })
    .nullable(),
  brand: z.string({
    required_error: 'Brand wajib diisi',
    invalid_type_error: 'Brand tidak valid',
    message: 'Brand tidak valid',
  }),
  salePrice: z.number({
    required_error: 'Harga jual wajib diisi',
    invalid_type_error: 'Harga jual tidak valid',
    message: 'Harga jual tidak valid',
  }),
  supplierPrice: z.number({
    required_error: 'Harga beli wajib diisi',
    invalid_type_error: 'Harga beli tidak valid',
    message: 'Harga beli tidak valid',
  }),
  wholesalePrice: z.number({
    required_error: 'Harga grosir wajib diisi',
    invalid_type_error: 'Harga grosir tidak valid',
    message: 'Harga grosir tidak valid',
  }),
  retailPrice: z.number({
    required_error: 'Harga retail wajib diisi',
    invalid_type_error: 'Harga retail tidak valid',
    message: 'Harga retail tidak valid',
  }),
  workshopPrice: z.number({
    required_error: 'Harga bengkel wajib diisi',
    invalid_type_error: 'Harga bengkel tidak valid',
    message: 'Harga bengkel tidak valid',
  }),
});
