import { TSearchParamsData } from '@/types';
import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { getSearchParams } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { getAllProducts } from '@/getters/productGetter';
import { productColumns, productStaffColumns } from './columns';
import { auth } from '@/lib/auth';

export default async function ManageProductPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllProducts({ params: searchParamsData });

  const session = await auth();
  const user = session?.user;
  const roleId = user?.role[0];

  return (
    <div>
      <PageTitle
        title={'Kelola Produk'}
        description='Kelola produk yang digunakan untuk mengelola data produk.'
      />

      <Section>
        <SectionHeader>
          <Search />
          {roleId === 1 || roleId === 2 ? (
            <Button className='ml-auto' asChild>
              <Link href='kelola-produk/tambah'>
                <MdAdd size={20} />
                Tambah
              </Link>
            </Button>
          ) : null}
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={
            roleId === 1 || roleId === 2 ? productColumns : productStaffColumns
          }
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
