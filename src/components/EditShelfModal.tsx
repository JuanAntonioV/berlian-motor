'use client';

import { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { updateShelfAction } from '@/actions/shelfAction';
import { Textarea } from './ui/textarea';
import { Shelf } from '@prisma/client';
import { Switch } from './ui/switch';

type Props = {
  data: Shelf;
};

export default function EditShelfModal({ data }: Props) {
  const [open, setOpen] = useState(false);

  const [state, action] = useFormState(updateShelfAction, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  useEffect(() => {
    if (open) {
      setPreviewImage(data.image);
    }
  }, [open]);

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

  const [statusValue, setStatusValue] = useState(data.status);

  return (
    <EditModal
      open={open}
      setOpen={setOpen}
      title='Ubah Rak'
      name='rak'
      form='editShelfForm'
      className='sm:max-w-xl w-full'
    >
      <Form action={action} id='editShelfForm'>
        <input type='hidden' name='id' value={data.id} />
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
            defaultValue={data.name}
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
            defaultValue={data.description || ''}
            placeholder='Masukkan keterangan rak'
          />

          {state?.error?.description && (
            <p className='text-red-500 text-sm'>{state.error.description}</p>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='email'>Status</Label>
          <div className='flex items-center gap-4'>
            <Switch
              name='status'
              defaultChecked={data.status}
              onCheckedChange={(checked) => setStatusValue(checked)}
            />
            {statusValue ? (
              <span className='text-green-500 text-sm'>Aktif</span>
            ) : (
              <span className='text-red-500 text-sm'>Tidak aktif</span>
            )}
          </div>
          <input type='hidden' name='status' value={statusValue.toString()} />

          {state?.error?.status && (
            <div className='text-red-500 text-sm'>{state.error.status}</div>
          )}
        </div>
      </Form>
    </EditModal>
  );
}
