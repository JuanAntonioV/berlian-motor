'use client';

import { Brand, Category } from '@prisma/client';
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

type Props = {
  brandsList: Brand[];
  categoriesList: Category[];
};

export default function CreateProductForm({
  brandsList,
  categoriesList,
}: Props) {
  const [state, action] = useFormState(createProductAction, { error: {} });

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

        {state?.error?.image && (
          <p className='text-red-500 text-sm'>{state.error.image}</p>
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

          {state?.error?.name && (
            <p className='text-red-500 text-sm'>{state.error.name}</p>
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

          {state?.error?.sku && (
            <p className='text-red-500 text-sm'>{state.error.sku}</p>
          )}
        </div>
      </div>

      <div className='form-group'>
        <Label htmlFor='brand'>
          Merek<span className='text-red-500 ml-1'>*</span>
        </Label>

        <Select name='brand'>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Pilih brand' />
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
                Tidak ada brand
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {state?.error?.brand && (
          <p className='text-red-500 text-sm'>{state.error.brand}</p>
        )}
      </div>

      <div className='form-group'>
        <Label htmlFor='type'>Tipe</Label>
        <Input
          type='text'
          id='type'
          name='type'
          placeholder='Masukkan tipe produk'
        />

        {state?.error?.type && (
          <p className='text-red-500 text-sm'>{state.error.type}</p>
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

          {state?.error?.salePrice && (
            <p className='text-red-500 text-sm'>{state.error.salePrice}</p>
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

          {state?.error?.supplierPrice && (
            <p className='text-red-500 text-sm'>{state.error.supplierPrice}</p>
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

          {state?.error?.wholesalePrice && (
            <p className='text-red-500 text-sm'>{state.error.wholesalePrice}</p>
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

          {state?.error?.retailPrice && (
            <p className='text-red-500 text-sm'>{state.error.retailPrice}</p>
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

        {state?.error?.workshopPrice && (
          <p className='text-red-500 text-sm'>{state.error.workshopPrice}</p>
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

        {state?.error?.categories && (
          <p className='text-red-500 text-sm'>{state.error.categories}</p>
        )}
      </div>

      <div className='form-group'>
        <Label htmlFor='description'>Deskripsi</Label>
        <Textarea
          id='description'
          name='description'
          placeholder='Masukkan keterangan produk'
        />

        {state?.error?.description && (
          <p className='text-red-500 text-sm'>{state.error.description}</p>
        )}
      </div>

      <div className='form-group mt-4'>
        <SubmitButton className='w-fit'>Tambah Produk</SubmitButton>
      </div>
    </Form>
  );
}
