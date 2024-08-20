'use client';

import { logoutAction } from '@/actions/authAction';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { MdLogout } from 'react-icons/md';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;
export default function SignOutButton({ className, ...props }: Props) {
  const [state, action] = useFormState(logoutAction, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Berhasil masuk');
      router.push('/dashboard');
    }
  }, [state]);

  return (
    <form action={action}>
      <button
        className='text-destructive gap-x-3 p-1 rounded-lg w-full flex items-center'
        type='submit'
      >
        <MdLogout size={18} />
        Keluar
      </button>
    </form>
  );
}
