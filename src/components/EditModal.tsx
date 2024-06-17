'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { MdEdit } from 'react-icons/md';
import { cn } from '@/lib/utils';
import SubmitButton from './SubmitButtom';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  name: string;
  form?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
};
export default function EditModal({
  open,
  setOpen,
  title = 'Ubah Data',
  name,
  form,
  isLoading,
  children,
  className,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size='icon' className='border-primary'>
          <MdEdit size={20} className='text-primary' />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader>
          <DialogTitle className='capitalize'>{title}</DialogTitle>
          <DialogDescription>
            Untuk mengubah <span className='lowercase'>{name}</span>, silahkan
            isi form di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <main className='my-4'>{children}</main>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Batal
            </Button>
          </DialogClose>
          <SubmitButton form={form} isLoading={isLoading}>
            Simpan
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
