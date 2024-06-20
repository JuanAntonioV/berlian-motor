import { menus } from '@/config/appMenu';
import NavItem from './NavItem';
import { User } from 'next-auth';

type TNavListsProps = {
  closeSidebar?: () => void;
  user: User;
};

export default function NavLists({ closeSidebar, user }: TNavListsProps) {
  const roleId = user?.role[0];
  return (
    <ul className='flex flex-col gap-y-4 mt-20 h-[calc(100vh-200px)] overflow-y-auto relative scrollbar'>
      {menus
        .filter((menu) => menu.roles?.includes(roleId as number))
        .map((menu, index) => (
          <NavItem key={index} item={menu} closeSidebar={closeSidebar} />
        ))}
    </ul>
  );
}
