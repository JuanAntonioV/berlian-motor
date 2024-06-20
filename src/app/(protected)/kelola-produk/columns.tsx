'use client';

import CopyText from '@/components/CopyText';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/formaters';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';

type Product = Prisma.ProductGetPayload<{
  include: {
    Brand: true;
    Category: true;
    ProductStock: {
      select: {
        quantity: true;
      };
    };
  };
}>;

const columnHelper = createColumnHelper<Product>();

export const productColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor('image', {
    header: 'Foto',
    enableSorting: false,
    size: 100,
    cell: (row) => (
      <div className='w-20 h-20'>
        <img
          src={row.getValue() as string}
          alt='shelf'
          className='w-full h-full object-cover rounded-lg bg-gray-200'
        />
      </div>
    ),
  }),
  columnHelper.accessor('sku', {
    header: 'Kode SKU',
    cell: (row) => (row.getValue() ? <CopyText value={row.getValue()} /> : '-'),
  }),
  columnHelper.accessor('name', {
    header: 'Nama produk',
    cell: (row) => row.getValue() || '-',
  }),
  columnHelper.accessor('salePrice', {
    header: 'Harga jual',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('supplierPrice', {
    header: 'Harga pemasok',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('wholesalePrice', {
    header: 'Harga grosir',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('retailPrice', {
    header: 'Harga eceran',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('workshopPrice', {
    header: 'Harga bengkel',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('ProductStock', {
    header: 'Total stok',
    cell: (row) =>
      row.getValue()?.reduce((acc, curr) => acc + curr.quantity, 0),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Dibuat pada',
    cell: (row) =>
      row.getValue() ? format(row.getValue() as Date, 'dd MMMM yyyy') : '-',
  }),
  columnHelper.display({
    header: 'Aksi',
    cell: (row) => (
      <div className='flexCenter gap-4'>
        <Button variant={'outline'} size={'icon'} asChild>
          <Link
            href={`/kelola-produk/${row.row.original.id}`}
            className='text-blue-500 border-blue-500 hover:text-blue-500'
          >
            <MdEdit size={20} />
          </Link>
        </Button>
      </div>
    ),
  }),
];

export const productStaffColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor('image', {
    header: 'Foto',
    enableSorting: false,
    size: 100,
    cell: (row) => (
      <div className='w-20 h-20'>
        <img
          src={row.getValue() as string}
          alt='shelf'
          className='w-full h-full object-cover rounded-lg bg-gray-200'
        />
      </div>
    ),
  }),
  columnHelper.accessor('sku', {
    header: 'Kode SKU',
    cell: (row) => (row.getValue() ? <CopyText value={row.getValue()} /> : '-'),
  }),
  columnHelper.accessor('name', {
    header: 'Nama produk',
    cell: (row) => row.getValue() || '-',
  }),
  columnHelper.accessor('salePrice', {
    header: 'Harga jual',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('wholesalePrice', {
    header: 'Harga grosir',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('retailPrice', {
    header: 'Harga eceran',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('workshopPrice', {
    header: 'Harga bengkel',
    cell: (row) => formatRupiah(row.getValue() || 0),
  }),
  columnHelper.accessor('ProductStock', {
    header: 'Total stok',
    cell: (row) =>
      row.getValue()?.reduce((acc, curr) => acc + curr.quantity, 0),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Dibuat pada',
    cell: (row) =>
      row.getValue() ? format(row.getValue() as Date, 'dd MMMM yyyy') : '-',
  }),
  columnHelper.display({
    header: 'Aksi',
    cell: (row) => (
      <div className='flexCenter gap-4'>
        <Button variant={'outline'} size={'icon'} asChild>
          <Link
            href={`/kelola-produk/${row.row.original.id}`}
            className='text-blue-500 border-blue-500 hover:text-blue-500'
          >
            <MdEdit size={20} />
          </Link>
        </Button>
      </div>
    ),
  }),
];

type ProductStock = Prisma.ProductStockGetPayload<{
  include: {
    Shelf: true;
    Store: true;
  };
}>;

const productStockColumnHelper = createColumnHelper<ProductStock>();

export const productStockColumns = [
  productStockColumnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (row) => row.getValue(),
  }),
  productStockColumnHelper.accessor('Shelf.image', {
    header: 'Foto rak',
    enableSorting: false,
    size: 100,
    cell: (row) => (
      <div className='w-20 h-20'>
        <img
          src={row.getValue() as string}
          alt='shelf'
          className='w-full h-full object-cover rounded-lg bg-gray-200'
        />
      </div>
    ),
  }),
  productStockColumnHelper.accessor('Shelf.name', {
    header: 'Nama rak',
    cell: (row) => row.getValue() || '-',
  }),
  productStockColumnHelper.accessor('quantity', {
    header: 'Stok',
    cell: (row) => row.getValue() || '0',
  }),
  productStockColumnHelper.accessor('createdAt', {
    header: 'Dibuat pada',
    cell: (row) =>
      row.getValue() ? format(row.getValue() as Date, 'dd MMMM yyyy') : '-',
  }),
];
