'use client';

import { useEffect, useState } from 'react';
import AddModal from './AddModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { createBrandAction } from '@/actions/brandAction';

export default function AddBrandModal() {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(createBrandAction, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <AddModal
      open={open}
      setOpen={setOpen}
      title='Tambah Merek'
      name='merek'
      form='brandForm'
    >
      <Form action={action} id='brandForm'>
        <div className='form-group'>
          <Label htmlFor='name'>Nama Merek</Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Masukkan nama merek'
            autoFocus
          />

          {state?.error?.name && (
            <p className='text-red-500 text-sm'>{state.error.name}</p>
          )}
        </div>
      </Form>
    </AddModal>
  );
}
