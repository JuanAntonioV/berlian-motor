'use client';

import { deleteBrandAction } from '@/actions/brandAction';
import DeleteModal from '@/components/DeleteModal';
import EditBrandModal from '@/components/EditBrandModal';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

type Brand = Prisma.BrandGetPayload<{}>;

const columnHelper = createColumnHelper<Brand>();

export const brandColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Nama merek',
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
        <EditBrandModal data={row.row.original} />
        <DeleteModal
          name='kategori'
          id={row.row.original.id}
          action={deleteBrandAction}
        />
      </div>
    ),
  }),
];
