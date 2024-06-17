'use client';

import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import {
  createCategoryAction,
  updateCategoryAction,
} from '@/actions/categoryAction';
import { Category } from '@prisma/client';

type Props = {
  data: Category;
};

export default function EditCategoryModal({ data }: Props) {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(updateCategoryAction, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <EditModal
      open={open}
      setOpen={setOpen}
      title='Ubah Kategori'
      name='kategori'
      form='editCategoryForm'
    >
      <Form action={action} id='editCategoryForm'>
        <input type='hidden' name='id' value={data.id} />
        <div className='form-group'>
          <Label htmlFor='name'>Nama Kategori</Label>
          <Input
            type='text'
            id='name'
            name='name'
            defaultValue={data.name}
            placeholder='Masukkan nama kategori'
            autoFocus
          />

          {state?.error?.name && (
            <p className='text-red-500 text-sm'>{state.error.name}</p>
          )}
        </div>
      </Form>
    </EditModal>
  );
}
