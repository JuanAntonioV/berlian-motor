'use client';

import { useFormState } from 'react-dom';
import Form from './Form';
import { changeStaffPasswordAction } from '@/actions/staffAction';
import { Label } from './ui/label';
import { Input } from './ui/input';
import SubmitButton from './SubmitButtom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ChangeStaffPasswordForm({ id }: { id: number }) {
  const [state, action] = useFormState(changeStaffPasswordAction, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state.success) {
      toast.success('Kata sandi berhasil diubah');
    }
  }, [state.success]);

  return (
    <Form action={action} id='changeStaffPasswordForm'>
      <input type='hidden' name='id' value={id.toString()} />
      <div className='form-group'>
        <Label htmlFor='password'>Kata Sandi</Label>
        <Input
          type='password'
          name='password'
          id='password'
          placeholder='Masukkan kata sandi baru'
        />

        {state?.error?.password && (
          <div className='text-red-500 text-sm'>{state.error.password}</div>
        )}
      </div>
      <div className='form-group'>
        <Label htmlFor='confirmPassword'>Kata Sandi</Label>
        <Input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Konfirmasi kata sandi baru'
        />

        {state?.error?.confirmPassword && (
          <div className='text-red-500 text-sm'>
            {state.error.confirmPassword}
          </div>
        )}
      </div>

      <div className='mt-2 flex items-center gap-4'>
        <SubmitButton className='w-fit'>Ubah kata sandi</SubmitButton>
        {state?.success && (
          <div className='text-green-500 text-sm font-semibold'>
            Berhasil diubah
          </div>
        )}
      </div>
    </Form>
  );
}
