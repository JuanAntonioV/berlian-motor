import { auth } from '@/lib/auth';
import BrandLogo from './BrandLogo';
import NavLists from './NavLists';

export default async function Sidebar() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <aside className='py-6 w-64 border-r border-gray-200 bg-black hidden lg:block h-screen'>
      <header className='px-4'>
        <BrandLogo />
      </header>

      <NavLists user={user} />
    </aside>
  );
}
