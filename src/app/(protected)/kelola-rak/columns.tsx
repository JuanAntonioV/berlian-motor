'use client';

import { deleteShelfAction } from '@/actions/shelfAction';
import DeleteModal from '@/components/DeleteModal';
import EditShelfModal from '@/components/EditShelfModal';
import { Badge } from '@/components/ui/badge';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

type Shelf = Prisma.ShelfGetPayload<{}>;

const columnHelper = createColumnHelper<Shelf>();

export const shelfColumns = [
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
  columnHelper.accessor('name', {
    header: 'Nama rak',
    cell: (row) => row.getValue() || '-',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.getValue() ? 'default' : 'destructive'}>
        {row.getValue() ? 'Aktif' : 'Tidak Aktif'}
      </Badge>
    ),
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
        <EditShelfModal data={row.row.original} />
        <DeleteModal
          name='kategori'
          id={row.row.original.id}
          action={deleteShelfAction}
        />
      </div>
    ),
  }),
];
