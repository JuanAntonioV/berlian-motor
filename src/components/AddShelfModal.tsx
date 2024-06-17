'use client';

import { useEffect, useState } from 'react';
import AddModal from './AddModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { createShelfAction } from '@/actions/shelfAction';
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import { Switch } from './ui/switch';

export default function AddShelfModal() {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(createShelfAction, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AddModal
      open={open}
      setOpen={setOpen}
      title='Tambah Rak'
      name='rak'
      form='shelfForm'
      className='sm:max-w-xl w-full'
    >
      <Form action={action} id='shelfForm'>
        <div className='form-group'>
          <Label htmlFor='image'>Foto</Label>

          {previewImage ? (
            <div className='flexCenter border-2 border-dashed rounded-lg w-full h-48 border-gray-300 bg-gray-100'>
              <img
                src={previewImage}
                alt='preview'
                className='w-full h-full object-contain'
              />
            </div>
          ) : (
            <div className='flexCenter border border-dashed rounded-lg w-full h-40 bg-gray-200'>
              <p className='text-gray-600'>Upload foto</p>
            </div>
          )}

          <div className='pt-2'>
            <Input type='file' name='image' onChange={onImageChange} />
          </div>

          {state?.error?.image && (
            <div className='text-red-500 text-sm'>{state.error.image}</div>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='name'>Nama Rak</Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Masukkan nama rak'
            autoFocus
          />

          {state?.error?.name && (
            <p className='text-red-500 text-sm'>{state.error.name}</p>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='description'>Keterangan Rak</Label>
          <Textarea
            id='description'
            name='description'
            placeholder='Masukkan keterangan rak'
          />

          {state?.error?.description && (
            <p className='text-red-500 text-sm'>{state.error.description}</p>
          )}
        </div>
      </Form>
    </AddModal>
  );
}
