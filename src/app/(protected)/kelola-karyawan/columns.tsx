'use client';

import CopyText from '@/components/CopyText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';

type UserWithRoles = Prisma.UserGetPayload<{
  include: {
    Roles: {
      include: {
        Role: true;
      };
    };
  };
}>;

const columnHelper = createColumnHelper<UserWithRoles>();

export const staffColumns = [
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
      <Avatar className='w-20 h-20'>
        {row.getValue() ? (
          <AvatarImage src={row.getValue() as string} alt='avatar' />
        ) : (
          <AvatarFallback>BM</AvatarFallback>
        )}
      </Avatar>
    ),
  }),
  columnHelper.accessor('name', {
    header: 'Nama lengkap',
    cell: (row) => row.getValue() || '-',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (row) =>
      row.getValue() ? <CopyText value={row.getValue() || '-'} /> : '-',
  }),
  columnHelper.accessor('Roles', {
    header: 'Role',
    enableSorting: false,
    cell: (row) =>
      row.getValue().length > 0
        ? row
            .getValue()
            .map((role) => role.Role.name)
            .join(', ')
        : '-',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.getValue() ? 'default' : 'destructive'}>
        {row.getValue() ? 'Aktif' : 'Tidak Aktif'}
      </Badge>
    ),
  }),
  columnHelper.accessor('joinDate', {
    header: 'Tanggal bergabung',
    cell: (row) =>
      row.getValue() ? format(row.getValue() as Date, 'dd MMMM yyyy') : '-',
  }),
  columnHelper.display({
    header: 'Aksi',
    cell: (row) => (
      <div className='flexCenter gap-4'>
        <Button variant={'outline'} size={'icon'} asChild>
          <Link
            href={`/kelola-karyawan/${row.row.original.id}`}
            className='text-blue-500 border-blue-500 hover:text-blue-500'
          >
            <MdEdit size={20} />
          </Link>
        </Button>
      </div>
    ),
  }),
];
