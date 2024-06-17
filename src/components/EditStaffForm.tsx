'use client';

import { updateStaffAction } from '@/actions/staffAction';
import { useFormState } from 'react-dom';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Form from './Form';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { Prisma, Roles } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import SubmitButton from './SubmitButtom';
import { Switch } from './ui/switch';

type Props = {
  rolesList: Roles[];
  data: Prisma.UserGetPayload<{
    include: {
      Roles: {
        include: {
          Role: true;
        };
      };
    };
  }>;
};

export default function EditStaffForm({ rolesList, data }: Props) {
  const [state, action] = useFormState(updateStaffAction, { error: {} });

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

  useEffect(() => {
    if (data?.joinDate) {
      setDate(new Date(data.joinDate));
    }

    if (data?.image) {
      setPreviewImage(data.image);
    }
  }, [data]);

  const [statusValue, setStatusValue] = useState(data.status);

  return (
    <div>
      <Form action={action}>
        <input type='hidden' name='id' value={data.id.toString()} />
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
            defaultValue={data.name || ''}
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
            defaultValue={data.email || ''}
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

          <Select name='role' defaultValue={data.Roles[0].Role.id.toString()}>
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

        <div className='form-group mt-4'>
          <SubmitButton className='w-fit'>Simpan</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
