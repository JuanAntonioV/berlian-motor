import { menus } from '@/config/appMenu';
import NavItem from './NavItem';

type TNavListsProps = {
  closeSidebar?: () => void;
};

export default function NavLists({ closeSidebar }: TNavListsProps) {
  return (
    <ul className='flex flex-col gap-y-4 mt-20 h-[calc(100vh-200px)] overflow-y-auto relative scrollbar'>
      {menus.map((menu, index) => (
        <NavItem key={index} item={menu} closeSidebar={closeSidebar} />
      ))}
    </ul>
  );
}
