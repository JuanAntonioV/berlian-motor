'use client';

import { createTransferAction } from '@/actions/transferAction';
import { Product, Shelf } from '@prisma/client';
import { useFormState } from 'react-dom';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import SubmitButton from './SubmitButtom';

type Props = {
  productsList: Product[];
  transfersId: string;
  shelfsList: Shelf[];
};

export default function CreateTransfersForm({
  productsList,
  transfersId,
  shelfsList,
}: Props) {
  const [state, action] = useFormState(createTransferAction, { error: {} });

  return (
    <Form action={action}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='form-group'>
          <Label htmlFor='invoiceNumber'>Nomor transfer</Label>
          <Input
            type='text'
            id='invoiceNumber'
            name='invoiceNumber'
            defaultValue={transfersId}
            placeholder='Masukkan nomor transfer'
          />

          {state?.error?.invoiceNumber && (
            <p className='text-red-500 text-sm'>{state.error.invoiceNumber}</p>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='reference'>Nomor referensi</Label>
          <Input
            type='text'
            id='reference'
            name='reference'
            placeholder='Masukkan nomor referensi'
          />

          {state?.error?.invoiceNumber && (
            <p className='text-red-500 text-sm'>{state.error.invoiceNumber}</p>
          )}
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='form-group'>
          <Label htmlFor='shelfId'>
            Rak penyimpanan<span className='text-red-500 ml-1'>*</span>
          </Label>

          <Select name='shelfId'>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Pilih rak penyimpanan' />
            </SelectTrigger>
            <SelectContent>
              {shelfsList?.length ? (
                shelfsList?.map((shelf) => (
                  <SelectItem key={shelf.id} value={String(shelf.id)}>
                    {shelf.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='-1'>
                  Tidak ada rak
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {state?.error?.shelfId && (
            <p className='text-red-500 text-sm'>{state.error.shelfId}</p>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='shelfToId'>
            Rak penyimpanan ujuan<span className='text-red-500 ml-1'>*</span>
          </Label>

          <Select name='shelfToId'>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Pilih rak penyimpanan tujuan' />
            </SelectTrigger>
            <SelectContent>
              {shelfsList?.length ? (
                shelfsList?.map((shelf) => (
                  <SelectItem key={shelf.id} value={String(shelf.id)}>
                    {shelf.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='-1'>
                  Tidak ada rak
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {state?.error?.shelfToId && (
            <p className='text-red-500 text-sm'>{state.error.shelfToId}</p>
          )}
        </div>
      </div>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
        <div className='form-group'>
          <Label htmlFor='sku'>
            Produk<span className='text-red-500 ml-1'>*</span>
          </Label>

          <Select name='sku'>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Pilih produk' />
            </SelectTrigger>
            <SelectContent>
              {productsList?.length ? (
                productsList?.map((product) => (
                  <SelectItem key={product.id} value={product.sku}>
                    {product.sku} - {product.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='-1'>
                  Tidak ada produk
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {state?.error?.sku && (
            <p className='text-red-500 text-sm'>{state.error.sku}</p>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='quantity'>
            Jumlah<span className='text-red-500 ml-1'>*</span>
          </Label>
          <Input
            type='number'
            id='quantity'
            min={1}
            defaultValue={1}
            name='quantity'
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === '.') {
                e.preventDefault();
              }
            }}
            placeholder='Masukkan jumlah'
          />

          {state?.error?.quantity && (
            <p className='text-red-500 text-sm'>{state.error.quantity}</p>
          )}
        </div>
      </div>

      <div className='form-group'>
        <Label htmlFor='attachment'>Lampiran</Label>

        <div className='pt-2'>
          <Input type='file' name='attachment' id='attachment' />
        </div>

        {state?.error?.attachment && (
          <p className='text-red-500 text-sm'>{state.error.attachment}</p>
        )}
      </div>

      <div className='form-group'>
        <Label htmlFor='notes'>Catatan</Label>
        <Textarea id='notes' name='notes' placeholder='Masukkan catatan' />

        {state?.error?.notes && (
          <p className='text-red-500 text-sm'>{state.error.notes}</p>
        )}
      </div>

      <div className='form-group mt-4'>
        <SubmitButton className='w-fit'>Simpan</SubmitButton>
      </div>
    </Form>
  );
}
