import { auth } from '@/lib/auth';
import MobileNavList from './MobileNavList';

export default async function SidebarMobile() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className='block lg:hidden'>
      <MobileNavList user={user} />
    </div>
  );
}
