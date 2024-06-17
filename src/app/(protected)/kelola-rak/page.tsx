import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import { shelfColumns } from './columns';
import { getAllShelfs } from '@/getters/shelfGetter';
import AddShelfModal from '@/components/AddShelfModal';

export default async function ManageShelfPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllShelfs({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Kelola Merek'}
        description='Kelola merek yang digunakan untuk mengelola data merek.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <AddShelfModal />
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={shelfColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
