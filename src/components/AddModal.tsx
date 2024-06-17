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
import { MdAdd } from 'react-icons/md';
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
  btnChildren?: React.ReactNode;
  className?: string;
};
export default function AddModal({
  open,
  setOpen,
  title = 'Tambah Data',
  name,
  form,
  isLoading,
  btnChildren,
  children,
  className,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!btnChildren ? (
          <Button className='capitalize'>
            <MdAdd size={20} />
            Tambah {name}
          </Button>
        ) : (
          btnChildren
        )}
      </DialogTrigger>
      <DialogContent
        className={cn(
          'sm:max-w-[425px] overflow-y-auto max-h-screen',
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className='capitalize'>{title}</DialogTitle>
          <DialogDescription>
            Untuk menambahkan <span className='lowercase'>{name}</span> baru,
            silahkan isi form di bawah ini.
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
