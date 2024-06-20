import { Prisma } from '@prisma/client';
import { Button } from './ui/button';
import Link from 'next/link';
import { MdKeyboardBackspace } from 'react-icons/md';
import CardCollapsable from './CardCollapsable';
import CopyText from './CopyText';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { HiOutlinePrinter } from 'react-icons/hi';

type Props = {
  data: Prisma.ReductionOfGoodsGetPayload<{
    include: {
      Store: true;
      User: true;
      Shelf: true;
      Product: {
        include: {
          Category: true;
          Brand: true;
          Shelf: true;
        };
      };
    };
  }>;
};

export default function ViewReductionOfGoodsDetail({ data }: Props) {
  const onDownloadAttachment = () => {
    const baseUrl = 'http://' + window.location.host;
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = `${baseUrl}/${data.attachment}`;
    link.download = 'attachment';
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <div>
      <header className='flexBetween gap-4 border-b pb-6 flex-wrap'>
        <div className='flex items-center gap-4'>
          <Button
            className='bg-slate-500 text-white hover:bg-slate-600/90'
            asChild
          >
            <Link href='/penerimaan-barang' className='flex items-center gap-1'>
              <MdKeyboardBackspace size={18} />
              Kembali
            </Link>
          </Button>
        </div>
      </header>

      <main className='mt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <CardCollapsable title='Detail Penerimaan'>
            <div className='flexBetween gap-4'>
              <div className='py-2 space-y-2'>
                <p className='text-sm text-gray-500'>Nomor Penerimaan</p>
                {data.invoiceNumber ? (
                  <CopyText value={data.invoiceNumber} className='font-bold' />
                ) : (
                  '-'
                )}
              </div>
              <div className='py-2 space-y-2 text-end'>
                <p className='text-sm text-gray-500'>Referensi</p>
                {data.reference ? (
                  <CopyText
                    value={data.reference}
                    className='font-bold text-end'
                    iconPosition='start'
                  />
                ) : (
                  '-'
                )}
              </div>
            </div>
            <div className='flexBetween gap-4'>
              <div className='py-2 space-y-2'>
                <p className='text-sm text-gray-500'>Tanggal Penerimaan</p>
                <p className='font-bold'>
                  {data.createdAt ? format(data.createdAt, 'dd MMMM y') : '-'}
                </p>
              </div>
            </div>

            <div className='py-2 space-y-2'>
              <p className='text-sm text-gray-500'>Catatan</p>
              <p className='font-medium text-sm'>{data.notes || '-'}</p>
            </div>
          </CardCollapsable>

          <CardCollapsable title='Detail Pemasok'>
            <div className='flexBetween gap-4'>
              <div className='py-2 space-y-2'>
                <p className='text-sm text-gray-500'>Nama Rak</p>
                <p className='font-bold'>{data.Shelf.name || '-'}</p>
              </div>
            </div>
          </CardCollapsable>
          <CardCollapsable title='Detail Pemasok'>
            <div className='flexBetween gap-4'>
              <div className='py-2 space-y-2'>
                <p className='text-sm text-gray-500'>Nama penerima</p>
                <p className='font-bold'>{data.User.name || '-'}</p>
              </div>
            </div>
            <div className='flexBetween gap-4'>
              <div className='py-2 space-y-2'>
                <p className='text-sm text-gray-500'>Email penerima</p>
                <p className='font-bold'>{data.User.email || '-'}</p>
              </div>
            </div>
          </CardCollapsable>
        </div>

        <CardCollapsable title='Detail Barang' className='mt-8'>
          <div className='overflow-x-auto w-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>QTY</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className='min-w-max'>
                      {`${data.Product.sku} - ${data.Product.name}`}
                    </div>
                  </TableCell>
                  <TableCell>{data.quantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardCollapsable>
      </main>

      <div className='lg:flexBetween !items-start gap-4 mt-8'>
        <div className='w-full mb-10 lg:mb-0 gap-4'>
          {data.attachment && (
            <Button
              onClick={onDownloadAttachment}
              className='bg-blue-500 text-white hover:bg-blue-600/90 gap-2 w-full md:w-auto'
            >
              <HiOutlinePrinter size={18} />
              Unduh Lampiran
            </Button>
          )}
        </div>
        <div className='flexEndCol w-full'>
          <div className='flexBetween w-full py-3 border-b'>
            <p className='xl:text-end font-medium w-full text-sm lg:text-base'>
              Jumlah Barang
            </p>
            <p className='text-end font-medium w-full'>{data.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
