'use client';

import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { Types } from '@prisma/client';
import { updateTypesAction } from '@/actions/typeAction';

type Props = {
  data: Types;
};

export default function EditTypeModal({ data }: Props) {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(updateTypesAction, {
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
      title='Ubah Tipe'
      name='tipe'
      form='editTypeForm'
    >
      <Form action={action} id='editTypeForm'>
        <input type='hidden' name='id' value={data.id} />
        <div className='form-group'>
          <Label htmlFor='name'>Nama Tipe</Label>
          <Input
            type='text'
            id='name'
            name='name'
            defaultValue={data.name}
            placeholder='Masukkan nama tipe'
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
