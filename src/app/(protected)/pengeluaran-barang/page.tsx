import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { getAllReductionOfGoods } from '@/getters/reductionOfGoodsGetter';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { reductionOfGoodsColumns } from './columns';

export default async function ManageGoodReceiptPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllReductionOfGoods({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Pengeluaran Barang'}
        description='Pengeluaran barang yang digunakan untuk mengelola data pengeluaran barang.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <Button className='ml-auto' asChild>
            <Link href='pengeluaran-barang/tambah'>
              <MdAdd size={20} />
              Tambah
            </Link>
          </Button>
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={reductionOfGoodsColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
