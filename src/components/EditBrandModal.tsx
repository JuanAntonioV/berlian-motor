'use client';

import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { updateBrandAction } from '@/actions/brandAction';
import { Brand } from '@prisma/client';

type Props = {
  data: Brand;
};

export default function EditBrandModal({ data }: Props) {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(updateBrandAction, {
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
      title='Ubah Merek'
      name='merek'
      form='editBrandForm'
    >
      <Form action={action} id='editBrandForm'>
        <input type='hidden' name='id' value={data.id} />
        <div className='form-group'>
          <Label htmlFor='name'>Nama Merek</Label>
          <Input
            type='text'
            id='name'
            name='name'
            defaultValue={data.name}
            placeholder='Masukkan nama merek'
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
