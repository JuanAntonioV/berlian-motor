'use client';

import { useEffect, useState } from 'react';
import AddModal from './AddModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { createCategoryAction } from '@/actions/categoryAction';

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(createCategoryAction, {
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
      title='Tambah Kategori'
      name='kategori'
      form='categoryForm'
    >
      <Form action={action} id='categoryForm'>
        <div className='form-group'>
          <Label htmlFor='name'>Nama Kategori</Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Masukkan nama kategori'
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
