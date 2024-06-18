import ChangePasswordForm from '@/components/ChangePasswordForm';
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { auth } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <PageTitle
        title={'Akun Saya'}
        description='Akun saya yang digunakan untuk mengelola data akun.'
      />

      <div className='grid grid-cols-1 xl:grid-cols-3 xl:gap-x-4 gap-y-4'>
        <Section className='col-span-2'>
          <SectionHeader>
            <div>
              <h2 className='text-xl font-bold'>Informasi Akun</h2>
              <p className='text-sm text-gray-500'>
                Informasi akun yang digunakan untuk login.
              </p>
            </div>
          </SectionHeader>
        </Section>
        <Section>
          <SectionHeader>
            <div>
              <h2 className='text-xl font-bold'>Ubah Kata Sandi</h2>
              <p className='text-sm text-gray-500'>
                Ubah kata sandi akun yang digunakan untuk login.
              </p>
            </div>
          </SectionHeader>

          <ChangePasswordForm id={parseInt(String(user?.id))} />
        </Section>
      </div>
    </div>
  );
}
