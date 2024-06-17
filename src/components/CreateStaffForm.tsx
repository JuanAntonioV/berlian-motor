'use client';

import { createStaffAction } from '@/actions/staffAction';
import { useFormState } from 'react-dom';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Form from './Form';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { Roles } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import SubmitButton from './SubmitButtom';

type Props = {
  rolesList: Roles[];
};

export default function CreateStaffForm({ rolesList }: Props) {
  const [state, action] = useFormState(createStaffAction, { error: {} });

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

  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Form action={action}>
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
            type='email'
            autoFocus
          />
          {state?.error?.email && (
            <div className='text-red-500 text-sm'>{state.error.email}</div>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='joinedDate'>Tanggal bergabung</Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? (
                  format(date, 'dd MMMM yyyy')
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={(date) => setDate(date || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <input
            type='hidden'
            name='joinedDate'
            value={date ? format(date, 'yyyy-MM-dd') : ''}
          />
          {state?.error?.joinedDate && (
            <div className='text-red-500 text-sm'>{state.error.joinedDate}</div>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='role'>Role</Label>

          <Select name='role'>
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='form-group'>
            <Label htmlFor='password'>Kata sandi</Label>
            <Input
              id='password'
              name='password'
              placeholder='Kata sandi'
              type='password'
            />
            {state?.error?.password && (
              <div className='text-red-500 text-sm'>{state.error.password}</div>
            )}
          </div>
          <div className='form-group'>
            <Label htmlFor='confirmPassword'>Konfirmasi kata sandi</Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Konfirmasi kata sandi'
              type='password'
            />
            {state?.error?.confirmPassword && (
              <div className='text-red-500 text-sm'>
                {state.error.confirmPassword}
              </div>
            )}
          </div>
        </div>

        <div className='form-group mt-4'>
          <SubmitButton className='w-fit'>Tambah</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
