'use client';

import { useEffect, useState } from 'react';
import AddModal from './AddModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { createTypesAction } from '@/actions/typeAction';

export default function AddTypeModal() {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(createTypesAction, {
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
      title='Tambah Tipe'
      name='tipe'
      form='typeForm'
    >
      <Form action={action} id='typeForm'>
        <div className='form-group'>
          <Label htmlFor='name'>Nama Tipe</Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Masukkan nama tipe'
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
