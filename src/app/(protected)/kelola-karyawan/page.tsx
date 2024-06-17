import DataTable from '@/components/DataTable';
import PageTitle from '@/components/PageTitle';
import Search from '@/components/Search';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { getAllStaffs } from '@/getters/staffGetter';
import { getSearchParams } from '@/lib/utils';
import { TSearchParamsData } from '@/types';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { staffColumns } from './columns';

export default async function ManageStaffPage({
  searchParams,
}: {
  searchParams: TSearchParamsData;
}) {
  const searchParamsData = getSearchParams(searchParams);
  const data = await getAllStaffs({ params: searchParamsData });

  return (
    <div>
      <PageTitle
        title={'Kelola Karyawan'}
        description='Kelola karyawan yang digunakan untuk mengelola data karyawan.'
      />

      <Section>
        <SectionHeader>
          <Search />
          <Button className='ml-auto' asChild>
            <Link href='kelola-karyawan/tambah'>
              <MdAdd size={20} />
              Tambah
            </Link>
          </Button>
        </SectionHeader>

        <DataTable
          data={data.data || []}
          columns={staffColumns}
          pageCount={Math.ceil(data.total / (data.per_page || 0) || 0)}
        />
      </Section>
    </div>
  );
}
