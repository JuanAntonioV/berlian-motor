import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { getAllTransfers } from '@/getters/transferGetter';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { transfersColumns } from './columns';

export default async function ManageTransferPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllTransfers({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Transfer Barang'}
        description='Transfer barang yang digunakan untuk mengelola data transfer barang.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <Button className='ml-auto' asChild>
            <Link href='transfer-barang/tambah'>
              <MdAdd size={20} />
              Tambah
            </Link>
          </Button>
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={transfersColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
