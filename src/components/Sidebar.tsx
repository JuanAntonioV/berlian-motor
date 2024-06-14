import BrandLogo from './BrandLogo';
import NavLists from './NavLists';

export default function Sidebar() {
  return (
    <aside className='py-6 w-64 border-r border-gray-200 bg-black hidden lg:block h-screen'>
      <header className='px-4'>
        <BrandLogo />
      </header>

      <NavLists />
    </aside>
  );
}
