'use client';

import { loginAction } from '@/actions/authAction';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButtom';
import Form from './Form';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, { error: {} });

  useEffect(() => {
    // @ts-ignore
    if (state?.error?.message) {
      // @ts-ignore
      toast.error(state.error.message);
    }
  }, [state]);

  return (
    <Form action={action} id='loginForm'>
      <div className='form-group'>
        <Label htmlFor='email'>Alamat email</Label>
        <Input
          id='email'
          name='email'
          placeholder='Alamat email'
          type='email'
          autoFocus
        />
        {state?.error?.email && (
          <div className='text-red-500 text-sm'>{state.error?.email}</div>
        )}
      </div>
      <div className='form-group'>
        <Label htmlFor='password'>Kata sandi</Label>
        <Input
          id='password'
          name='password'
          placeholder='Kata sandi'
          type='password'
        />

        {state?.error?.password && (
          <div className='text-red-500 text-sm'>{state.error?.password}</div>
        )}
      </div>

      <div className='mt-4'>
        <SubmitButton className='w-full' form='loginForm'>
          Masuk
        </SubmitButton>
      </div>
    </Form>
  );
}
