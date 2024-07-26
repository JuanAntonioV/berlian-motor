'use client';

import { Brand, Category, Types } from '@prisma/client';
import Form from './Form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useFormState } from 'react-dom';
import { createProductAction } from '@/actions/productAction';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { formatInputRupiah, parseRupiah } from '@/lib/formaters';
import MultipleSelector from './ui/multiple-selector';
import SubmitButton from './SubmitButtom';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';
import { IoWarning } from 'react-icons/io5';

type Props = {
  brandsList: Brand[];
  categoriesList: Category[];
  typeList: Types[];
};

export default function CreateProductForm({
  brandsList,
  categoriesList,
  typeList,
}: Props) {
  const [state, action] = useFormState(createProductAction, { errors: {} });

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

  const [price, setPrice] = useState({
    salePrice: '',
    supplierPrice: '',
    wholesalePrice: '',
    retailPrice: '',
    workshopPrice: '',
  });

  function onChangePrice(e: any) {
    const { name, value } = e.target;
    const regex = /^[0-9.,-]*$/;

    if (regex.test(value)) {
      const formated = formatInputRupiah(value);

      if (parseInt(formated) <= 0) {
        setPrice({
          ...price,
          [name]: '',
        });
      } else {
        setPrice({
          ...price,
          [name]: formated,
        });
      }
    }
  }

  const [categoryValue, setCategoryValue] = useState('');

  return (
    <Form action={action}>
      {state?.message && (
        <Alert variant={'destructive'} className='mb-6'>
          <IoWarning className='h-4 w-4' />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      )}

      <div className='form-group'>
        <Label htmlFor='image'>Foto</Label>

        {previewImage && (
          <div className='flexCenter border-2 border-dashed rounded-lg w-full h-48 border-gray-300 bg-gray-100'>
            <img
              src={previewImage}
              alt='preview'
              className='w-full h-full object-contain'
            />
          </div>
        )}

        <div className='pt-2'>
          <Input type='file' name='image' onChange={onImageChange} />
        </div>

        {state?.errors?.image && (
          <p className='text-red-500 text-sm'>{state.errors.image}</p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='form-group'>
          <Label htmlFor='name'>
            Nama produk<span className='text-red-500 ml-1'>*</span>
          </Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Masukkan nama produk'
          />

          {state?.errors?.name && (
            <p className='text-red-500 text-sm'>{state.errors.name}</p>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='sku'>Kode SKU</Label>
          <Input
            type='text'
            id='sku'
            name='sku'
            placeholder='Masukkan kode SKU'
          />

          {state?.errors?.sku && (
            <p className='text-red-500 text-sm'>{state.errors.sku}</p>
          )}
        </div>
      </div>

      <div className='form-group'>
        <Label htmlFor='brand'>
          Merek<span className='text-red-500 ml-1'>*</span>
        </Label>

        <Select name='brand'>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Pilih merek' />
          </SelectTrigger>
          <SelectContent>
            {brandsList.length ? (
              brandsList.map((brand) => (
                <SelectItem key={brand.id} value={String(brand.id)}>
                  {brand.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value='-1'>
                Tidak ada merek
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {state?.errors?.brand && (
          <p className='text-red-500 text-sm'>{state.errors.brand}</p>
        )}
      </div>

      <div className='form-group'>
        <Label htmlFor='type'>Tipe</Label>
        <Select name='type'>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Pilih tipe' />
          </SelectTrigger>
          <SelectContent>
            {typeList.length ? (
              typeList.map((type) => (
                <SelectItem key={type.id} value={String(type.id)}>
                  {type.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value='-1'>
                Tidak ada tipe
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {state?.errors?.type && (
          <p className='text-red-500 text-sm'>{state.errors.type}</p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <div className='form-group'>
          <Label htmlFor='salePrice'>
            Harga jual<span className='text-red-500 ml-1'>*</span>
          </Label>
          <Input
            type='text'
            id='salePrice'
            name='salePrice'
            placeholder='Masukkan harga jual produk'
            value={price.salePrice}
            onChange={onChangePrice}
          />

          {state?.errors?.salePrice && (
            <p className='text-red-500 text-sm'>{state.errors.salePrice}</p>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='supplierPrice'>
            Harga pemasok<span className='text-red-500 ml-1'>*</span>
          </Label>
          <Input
            type='text'
            id='supplierPrice'
            name='supplierPrice'
            placeholder='Masukkan harga pemasok produk'
            value={price.supplierPrice}
            onChange={onChangePrice}
          />

          {state?.errors?.supplierPrice && (
            <p className='text-red-500 text-sm'>{state.errors.supplierPrice}</p>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='wholesalePrice'>
            Harga grosir<span className='text-red-500 ml-1'>*</span>
          </Label>
          <Input
            type='text'
            id='wholesalePrice'
            name='wholesalePrice'
            placeholder='Masukkan harga grosir produk'
            value={price.wholesalePrice}
            onChange={onChangePrice}
          />

          {state?.errors?.wholesalePrice && (
            <p className='text-red-500 text-sm'>
              {state.errors.wholesalePrice}
            </p>
          )}
        </div>

        <div className='form-group'>
          <Label htmlFor='retailPrice'>
            Harga eceran<span className='text-red-500 ml-1'>*</span>
          </Label>
          <Input
            type='text'
            id='retailPrice'
            name='retailPrice'
            placeholder='Masukkan harga eceran produk'
            value={price.retailPrice}
            onChange={onChangePrice}
          />

          {state?.errors?.retailPrice && (
            <p className='text-red-500 text-sm'>{state.errors.retailPrice}</p>
          )}
        </div>
      </div>

      <div className='form-group'>
        <Label htmlFor='workshopPrice'>
          Harga bengkel<span className='text-red-500 ml-1'>*</span>
        </Label>
        <Input
          type='text'
          id='workshopPrice'
          name='workshopPrice'
          placeholder='Masukkan harga bengkel produk'
          value={price.workshopPrice}
          onChange={onChangePrice}
        />

        {state?.errors?.workshopPrice && (
          <p className='text-red-500 text-sm'>{state.errors.workshopPrice}</p>
        )}
      </div>
      <div className='form-group'>
        <Label htmlFor='workshopPrice'>Kategori</Label>

        <MultipleSelector
          defaultOptions={categoriesList.map((category) => ({
            label: category.name,
            value: String(category.id),
          }))}
          placeholder='Pilih kategori produk'
          emptyIndicator={
            <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
              Tidak ada kategori produk
            </p>
          }
          onChange={(selected) => {
            const values = selected.map((item) =>
              Number(item.value)
            ) as number[];
            setCategoryValue(values.join(','));
          }}
        />
        <input type='hidden' name='categories' value={categoryValue} />

        {state?.errors?.categories && (
          <p className='text-red-500 text-sm'>{state.errors.categories}</p>
        )}
      </div>

      <div className='form-group'>
        <Label htmlFor='description'>Deskripsi</Label>
        <Textarea
          id='description'
          name='description'
          placeholder='Masukkan keterangan produk'
        />

        {state?.errors?.description && (
          <p className='text-red-500 text-sm'>{state.errors.description}</p>
        )}
      </div>

      <div className='form-group mt-4'>
        <SubmitButton className='w-fit'>Tambah Produk</SubmitButton>
      </div>
    </Form>
  );
}
