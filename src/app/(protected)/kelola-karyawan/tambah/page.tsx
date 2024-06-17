import CreateStaffForm from '@/components/CreateStaffForm';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import { getRoleList } from '@/getters/rolesGetter';

export default async function CreateStaffPage() {
  const rolesList = await getRoleList();

  return (
    <div>
      <PageTitle
        title={'Tambah Karyawan'}
        description='Tambah karyawan digunakan untuk menambah data karyawan.'
      />

      <Section>
        <CreateStaffForm rolesList={rolesList} />
      </Section>
    </div>
  );
}
