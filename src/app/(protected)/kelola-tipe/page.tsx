import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import { typeColumns } from './columns';
import { getAllTypes } from '@/getters/typeGetter';
import AddTypeModal from '@/components/AddTypeModal';

export default async function ManageTypePage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllTypes({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Kelola Tipe'}
        description='Kelola tipe yang digunakan untuk mengelola data tipe.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <AddTypeModal />
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={typeColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
