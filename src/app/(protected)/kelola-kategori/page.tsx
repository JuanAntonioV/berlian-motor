import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { getAllCategories } from '@/getters/categoryGetter';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import { categoryColumns } from './columns';
import AddCategoryModal from '@/components/AddCategoryModal';

export default async function ManageCategoriesPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllCategories({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Kelola Kategori'}
        description='Kelola kategori yang digunakan untuk mengelola data kategori.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <AddCategoryModal />
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={categoryColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
