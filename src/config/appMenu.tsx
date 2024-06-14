import { TMenu } from '@/types';
import { FaUsers } from 'react-icons/fa';
import { FaBoxesStacked } from 'react-icons/fa6';
import { HiShoppingBag } from 'react-icons/hi';
import { LuUser2 } from 'react-icons/lu';
import { MdDiscount, MdLogout, MdSpaceDashboard } from 'react-icons/md';
import { RiInboxArchiveFill } from 'react-icons/ri';

export const menus: TMenu[] = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard size={24} />,
    subMenus: [],
  },
  {
    id: 2,
    label: 'Products',
    href: '/kelola-produk',
    icon: <HiShoppingBag size={24} />,
    subMenus: [],
  },
  {
    id: 3,
    label: 'Karyawan',
    href: '/kelola-karyawan',
    icon: <FaUsers size={24} />,
    subMenus: [],
  },
  {
    id: 4,
    label: 'Manajemen',
    href: '/',
    icon: <RiInboxArchiveFill size={24} />,
    subMenus: [
      {
        id: 1,
        label: 'Kelola Kategori',
        href: '/kelola-kategori',
      },
      {
        id: 2,
        label: 'Kelola Merek',
        href: '/kelola-merek',
      },
    ],
  },
  {
    id: 5,
    label: 'Penyimpanan',
    href: '/',
    icon: <RiInboxArchiveFill size={24} />,
    subMenus: [
      {
        id: 1,
        label: 'Penerimaan Barang',
        href: '/penerimaan-barang',
      },
      {
        id: 2,
        label: 'Pengeluaran Barang',
        href: '/pengeluaran-barang',
      },
      {
        id: 3,
        label: 'Transfer Barang',
        href: '/transfer-barang',
      },
      {
        id: 4,
        label: 'Penyesuaian Barang',
        href: '/penyesuaian-barang',
      },
    ],
  },
];

export const profileMenus: TMenu[] = [
  {
    id: 1,
    label: 'Akun saya',
    href: '/akun-saya',
    icon: <LuUser2 size={18} />,
  },
  {
    id: 2,
    label: 'Keluar',
    href: '/auth/login',
    icon: <MdLogout size={18} />,
  },
];
