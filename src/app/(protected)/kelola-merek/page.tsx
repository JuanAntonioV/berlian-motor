import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { getAllBrands } from '@/getters/brandGetter';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import { brandColumns } from './columns';
import AddBrandModal from '@/components/AddBrandModal';

export default async function ManageBrandPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllBrands({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Kelola Merek'}
        description='Kelola merek yang digunakan untuk mengelola data merek.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <AddBrandModal />
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={brandColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
