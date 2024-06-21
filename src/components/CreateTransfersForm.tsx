'use client';

import { createTransferAction } from '@/actions/transferAction';
import { Prisma, Product, Shelf } from '@prisma/client';
import { useFormState } from 'react-dom';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import SubmitButton from './SubmitButtom';
import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';

type Props = {
  productsList: Prisma.ProductGetPayload<{
    include: {
      ProductStock: {
        select: {
          storeId: true;
          shelfId: true;
          quantity: true;
        };
      };
    };
  }>[];
  transfersId: string;
  shelfsList: Shelf[];
};

export default function CreateTransfersForm({
  productsList,
  transfersId,
  shelfsList,
}: Props) {
  console.log('🚀 ~ productsList:', productsList);
  const [state, action] = useFormState(createTransferAction, { error: {} });

  const [openProduct, setOpenProduct] = useState(false);
  const [valueSku, setValueSku] = useState('');
  const [openShelf, setOpenShelf] = useState(false);
  const [valueShelf, setValueShelf] = useState('');
  const [openShelfTo, setOpenShelfTo] = useState(false);
  const [valueShelfTo, setValueShelfTo] = useState('');

  const sheltToList = useMemo(
    () => shelfsList?.filter((shelf) => shelf.id !== parseInt(valueShelf)),
    [shelfsList, valueShelf]
  );

  const availableProducts = useMemo(
    () =>
      productsList?.filter(
        (product) =>
          product.ProductStock.filter(
            (stock) =>
              stock.quantity > 0 && stock.shelfId === parseInt(valueShelf)
          ).length > 0
      ),
    [productsList, valueShelf]
  );

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

          <Popover open={openShelf} onOpenChange={setOpenShelf}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={openShelf}
                className='w-full justify-between'
              >
                {valueShelf
                  ? shelfsList?.find(
                      (shelf) => shelf.id === parseInt(valueShelf)
                    )?.name
                  : 'Pilih rak...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[400px] p-0'>
              <Command>
                <CommandInput placeholder='Cari rak...' name='shelfId' />
                <CommandList>
                  <CommandEmpty>Tidak ada rak.</CommandEmpty>
                  <CommandGroup>
                    {shelfsList?.map((shelf) => (
                      <CommandItem
                        key={shelf.id}
                        value={shelf.name}
                        onSelect={(currentValue) => {
                          const selected = shelfsList?.find(
                            (shelf) => shelf.name === currentValue
                          );

                          if (selected) {
                            setValueShelf(String(selected.id));
                          }

                          setOpenShelf(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            parseInt(valueShelf) === shelf.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {shelf.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <input type='hidden' name='shelfId' value={valueShelf} />

          {state?.error?.shelfId && (
            <p className='text-red-500 text-sm'>{state.error.shelfId}</p>
          )}
        </div>
        <div className='form-group'>
          <Label htmlFor='shelfToId'>
            Rak penyimpanan ujuan<span className='text-red-500 ml-1'>*</span>
          </Label>

          <Popover open={openShelfTo} onOpenChange={setOpenShelfTo}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={openShelfTo}
                className='w-full justify-between'
              >
                {valueShelfTo
                  ? sheltToList?.find(
                      (shelf) => shelf.id === parseInt(valueShelfTo)
                    )?.name
                  : 'Pilih rak...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[400px] p-0'>
              <Command>
                <CommandInput placeholder='Cari rak...' name='shelfId' />
                <CommandList>
                  <CommandEmpty>Tidak ada rak.</CommandEmpty>
                  <CommandGroup>
                    {sheltToList?.map((shelf) => (
                      <CommandItem
                        key={shelf.id}
                        value={shelf.name}
                        onSelect={(currentValue) => {
                          const selected = sheltToList?.find(
                            (shelf) => shelf.name === currentValue
                          );

                          if (selected) {
                            setValueShelfTo(String(selected.id));
                          }

                          setOpenShelfTo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            parseInt(valueShelfTo) === shelf.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {shelf.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <input type='hidden' name='shelfToId' value={valueShelfTo} />

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

          <Popover open={openProduct} onOpenChange={setOpenProduct}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={openProduct}
                className='w-full justify-between'
              >
                {valueSku
                  ? `${
                      productsList?.find((product) => product.sku === valueSku)
                        ?.sku
                    } - ${
                      productsList?.find((product) => product.sku === valueSku)
                        ?.name
                    }`
                  : 'Pilih produk...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[400px] p-0'>
              <Command>
                <CommandInput placeholder='Cari produk...' name='sku' />
                <CommandList>
                  <CommandEmpty>Tidak ada produk.</CommandEmpty>
                  <CommandGroup>
                    {availableProducts?.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.sku}
                        onSelect={(currentValue) => {
                          const selected = productsList?.find(
                            (product) => product.sku === currentValue
                          );

                          if (selected) {
                            setValueSku(selected.sku);
                          }

                          setOpenProduct(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            valueSku === product.sku
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {product.sku} - {product.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <input type='hidden' name='sku' value={valueSku} />

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
            max={
              productsList
                ?.find((product) => product.sku === valueSku)
                ?.ProductStock?.find(
                  (stock) => stock.shelfId === parseInt(valueShelf)
                )?.quantity
            }
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
