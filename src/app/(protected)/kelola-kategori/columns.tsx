'use client';

import { deleteCategoryAction } from '@/actions/categoryAction';
import DeleteModal from '@/components/DeleteModal';
import EditCategoryModal from '@/components/EditCategoryModal';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';

type CategoryWithRoles = Prisma.CategoryGetPayload<{}>;

const columnHelper = createColumnHelper<CategoryWithRoles>();

export const categoryColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Nama kategori',
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
        <EditCategoryModal data={row.row.original} />
        <DeleteModal
          name='kategori'
          id={row.row.original.id}
          action={deleteCategoryAction}
        />
      </div>
    ),
  }),
];
