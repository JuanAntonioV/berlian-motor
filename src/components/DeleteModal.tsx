'use client';

import { CgTrash } from 'react-icons/cg';
import { Button } from './ui/button';
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
import { cn } from '@/lib/utils';
import { IoWarningOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from './SubmitButtom';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

type Props = {
  name: string;
  action: any;
  id: any;
  navigateTo?: string;
  children?: React.ReactNode;
  label?: string;
};

export default function DeleteModal({
  name,
  action,
  id,
  label = 'Hapus',
  navigateTo,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [state, formAction] = useFormState(action, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(`${name} berhasil dihapus`);
      if (navigateTo) {
        router.push(navigateTo);
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!children ? (
          <Button variant='outline' size='icon' className='border-destructive'>
            <CgTrash size={20} className='text-destructive' />
          </Button>
        ) : (
          children
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='capitalize'>
            {label} {name}
          </DialogTitle>
        </DialogHeader>
        <main className={cn('flexCenter py-6')}>
          <form
            id={`delete-${name}-form`}
            action={formAction}
            className='flexCenterCol gap-4'
          >
            <input type='hidden' name='id' value={id} />
            <IoWarningOutline size={62} className='text-red-500' />
            <DialogDescription className='text-center'>
              Apakah Anda yakin ingin{' '}
              {label === 'Batalkan' ? 'membatalkan' : 'menghapus'}{' '}
              <span className='lowercase'>{name}</span> ini?
            </DialogDescription>
          </form>
        </main>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Batal
            </Button>
          </DialogClose>
          <SubmitButton variant={'destructive'} form={`delete-${name}-form`}>
            Hapus
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
