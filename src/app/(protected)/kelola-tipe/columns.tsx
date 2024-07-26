'use client';

import { deleteTypesAction } from '@/actions/typeAction';
import DeleteModal from '@/components/DeleteModal';
import EditTypeModal from '@/components/EditTypeModal';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

type Type = Prisma.TypesGetPayload<{}>;

const columnHelper = createColumnHelper<Type>();

export const typeColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Nama tipe',
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
        <EditTypeModal data={row.row.original} />
        <DeleteModal
          name='tipe'
          id={row.row.original.id}
          action={deleteTypesAction}
        />
      </div>
    ),
  }),
];
