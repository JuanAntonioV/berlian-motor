'use client';

import CopyText from '@/components/CopyText';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';

type ReductionOfGoods = Prisma.ReductionOfGoodsGetPayload<{
  include: {
    Store: true;
    User: true;
    Shelf: true;
    Product: {
      include: {
        Category: true;
        Brand: true;
        Shelf: true;
      };
    };
  };
}>;

const columnHelper = createColumnHelper<ReductionOfGoods>();

export const reductionOfGoodsColumns = [
  columnHelper.accessor('invoiceNumber', {
    header: 'Nomor penerimaan',
    enableSorting: false,
    cell: (row) => (row.getValue() ? <CopyText value={row.getValue()} /> : '-'),
  }),
  columnHelper.accessor('Product.sku', {
    header: 'SKU produk',
    enableSorting: false,
    cell: (row) => (row.getValue() ? <CopyText value={row.getValue()} /> : '-'),
  }),
  columnHelper.accessor('Shelf.name', {
    header: 'Kode rak',
    enableSorting: false,
    cell: (row) => (row.getValue() ? <CopyText value={row.getValue()} /> : '-'),
  }),
  columnHelper.accessor('quantity', {
    header: 'Jumlah stok',
    cell: (row) => row.getValue() || '0',
  }),
  columnHelper.accessor('User.name', {
    header: 'Diterima oleh',
    cell: (row) => row.getValue() || '-',
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
            href={`/pengeluaran-barang/${row.row.original.invoiceNumber}`}
            className='text-blue-500 border-blue-500 hover:text-blue-500'
          >
            <MdEdit size={20} />
          </Link>
        </Button>
      </div>
    ),
  }),
];
