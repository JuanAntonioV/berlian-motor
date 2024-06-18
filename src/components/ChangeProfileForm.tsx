'use client';

import { User } from 'next-auth';
import Form from './Form';
import { useFormState } from 'react-dom';
import { changeProfileAction } from '@/actions/authAction';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Roles } from '@prisma/client';
import SubmitButton from './SubmitButtom';
import { useSession } from 'next-auth/react';

type Props = {
  user: User;
  rolesList: Roles[];
};

export default function ChangeProfileForm({ user, rolesList }: Props) {
  const [state, action] = useFormState(changeProfileAction, {
    error: {},
    success: undefined,
  });

  useEffect(() => {
    if (state.success) {
      toast.success('Profil berhasil diubah');
    }
  }, [state.success]);

  const { update } = useSession();

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

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (user?.joinDate) {
      setDate(new Date(user.joinDate));
    }

    if (user?.image) {
      setPreviewImage(user.image);
    }
  }, [user]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    action(formData);

    update({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <input type='hidden' name='id' value={user.id?.toString()} />
        <div className='form-group'>
          <Label htmlFor='image'>Foto</Label>

          <Avatar className='w-32 h-32'>
            {previewImage ? (
              <AvatarImage src={previewImage} alt='avatar' />
            ) : (
              <AvatarFallback>BM</AvatarFallback>
            )}
          </Avatar>

          <div className='pt-2'>
            <Input type='file' name='image' onChange={onImageChange} />
          </div>

          {state?.error?.image && (
            <div className='text-red-500 text-sm'>{state.error.image}</div>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='name'>Nama lengkap</Label>
          <Input
            id='name'
            name='name'
            placeholder='Nama lengkap'
            defaultValue={user.name || ''}
            type='name'
            autoFocus
          />
          {state?.error?.name && (
            <div className='text-red-500 text-sm'>{state.error.name}</div>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='email'>Alamat email</Label>
          <Input
            id='email'
            name='email'
            placeholder='Alamat email'
            defaultValue={user.email || ''}
            type='email'
            autoFocus
          />
          {state?.error?.email && (
            <div className='text-red-500 text-sm'>{state.error.email}</div>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='joinedDate'>Tanggal bergabung</Label>

          <Input
            type='text'
            name='joinDate'
            disabled
            value={date ? format(date, 'yyyy-MM-dd') : ''}
          />
        </div>

        <div className='form-group'>
          <Label htmlFor='role'>Role</Label>

          <Select name='role' defaultValue={user.role[0].toString()} disabled>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Pilih role' />
            </SelectTrigger>
            <SelectContent>
              {rolesList.length ? (
                rolesList.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='-1'>
                  Tidak ada role
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className='form-group mt-4'>
          <SubmitButton className='w-fit'>Simpan</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
