import { deleteProductAction } from '@/actions/productAction';
import ClientTable from '@/components/ClientTable';
import DeleteModal from '@/components/DeleteModal';
import EditProductForm from '@/components/EditProductForm';
import NotFoundScreen from '@/components/NotFoundScreen';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { getBrandsList } from '@/getters/brandGetter';
import { getCategoriesList } from '@/getters/categoryGetter';
import { getProductById, getProductStocks } from '@/getters/productGetter';
import { CgTrash } from 'react-icons/cg';
import { productStockColumns } from '../columns';
import { auth } from '@/lib/auth';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const brandsList = await getBrandsList();
  const categoriesList = await getCategoriesList();
  const productStocks = await getProductStocks(String(id));

  const data = await getProductById(String(id));

  const session = await auth();
  const user = session?.user;
  const roleId = user?.role[0];

  if (!data) {
    return <NotFoundScreen />;
  }

  return (
    <div>
      <PageTitle
        title={'Ubah Produk'}
        description='Ubah produk digunakan untuk mengubah data produk.'
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4'>
        <Section className='col-span-2'>
          <SectionHeader className='border-b pb-4'>
            <div>
              <h2 className='text-lg font-semibold'>Data Produk</h2>
              <p className='text-sm text-gray-500'>
                Silahkan isi data produk yang ingin diubah.
              </p>
            </div>
          </SectionHeader>

          <EditProductForm
            brandsList={brandsList}
            categoriesList={categoriesList}
            data={data}
            roleId={roleId!}
          />
        </Section>

        <div className='space-y-4'>
          <Section>
            <SectionHeader className='border-b pb-4'>
              <div>
                <h2 className='text-lg font-semibold'>Stok produk</h2>
                <p className='text-sm text-gray-500'>
                  Stok produk digunakan untuk melihat stok produk.
                </p>
              </div>
            </SectionHeader>

            <ClientTable
              data={productStocks || []}
              columns={productStockColumns}
            />
          </Section>

          {roleId === 1 || roleId === 2 ? (
            <Section>
              <SectionHeader className='border-b pb-4'>
                <div>
                  <h2 className='text-lg font-semibold'>Hapus produk</h2>
                  <p className='text-sm text-gray-500'>
                    Hapus produk digunakan untuk menghapus data produk.
                  </p>
                </div>
              </SectionHeader>

              <main className='mb-4'>
                <DeleteModal name='produk' action={deleteProductAction} id={id}>
                  <Button variant={'destructive'} className='gap-1'>
                    <CgTrash size={20} />
                    Hapus Produk
                  </Button>
                </DeleteModal>
              </main>
              <footer>
                <p className='text-sm text-gray-500 mt-2'>
                  Tinda ini tidak dapat dikembalikan. Pastikan untuk memilih
                  produk yang benar.
                </p>
              </footer>
            </Section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
