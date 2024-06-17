import { deleteStaffAction } from '@/actions/staffAction';
import ChangeStaffPasswordForm from '@/components/ChangeStaffPasswordForm';
import DeleteModal from '@/components/DeleteModal';
import EditStaffForm from '@/components/EditStaffForm';
import NotFoundScreen from '@/components/NotFoundScreen';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { getRoleList } from '@/getters/rolesGetter';
import { getStaffById } from '@/getters/staffGetter';
import { CgTrash } from 'react-icons/cg';

export default async function EditStaffPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const rolesList = await getRoleList();

  const data = await getStaffById(id);

  if (!data) {
    return <NotFoundScreen />;
  }

  return (
    <div>
      <PageTitle
        title={'Ubah Karyawan'}
        description='Ubah karyawan digunakan untuk mengubah data karyawan.'
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4'>
        <Section className='col-span-2'>
          <SectionHeader className='border-b pb-4'>
            <div>
              <h2 className='text-lg font-semibold'>Data Karyawan</h2>
              <p className='text-sm text-gray-500'>
                Silahkan isi data karyawan yang ingin diubah.
              </p>
            </div>
          </SectionHeader>

          <EditStaffForm rolesList={rolesList} data={data} />
        </Section>

        <div className='space-y-4'>
          <Section>
            <SectionHeader className='border-b pb-4'>
              <div>
                <h2 className='text-lg font-semibold'>Ubah kata sandi</h2>
                <p className='text-sm text-gray-500'>
                  Ubah kata sandi digunakan untuk mengubah kata sandi karyawan.
                </p>
              </div>
            </SectionHeader>

            <ChangeStaffPasswordForm id={id} />
          </Section>
          <Section>
            <SectionHeader className='border-b pb-4'>
              <div>
                <h2 className='text-lg font-semibold'>Hapus karyawan</h2>
                <p className='text-sm text-gray-500'>
                  Hapus karyawan digunakan untuk menghapus data karyawan.
                </p>
              </div>
            </SectionHeader>

            <main className='mb-4'>
              <DeleteModal name='karyawan' action={deleteStaffAction} id={id}>
                <Button variant={'destructive'} className='gap-1'>
                  <CgTrash size={20} />
                  Hapus Karyawan
                </Button>
              </DeleteModal>
            </main>
            <footer>
              <p className='text-sm text-gray-500 mt-2'>
                Tinda ini tidak dapat dikembalikan. Pastikan untuk memilih
                karyawan yang benar.
              </p>
            </footer>
          </Section>
        </div>
      </div>
    </div>
  );
}
