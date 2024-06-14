import { cn } from '@/lib/utils';
import { TSubMenus } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  subItem: TSubMenus;
  closeSidebar?: () => void;
};

export default function NavSubItem({ subItem, closeSidebar }: Props) {
  const pathname = usePathname();

  return (
    <li
      key={subItem.href}
      className='border-b border-b-gray-800 first:mt-2'
      onClick={closeSidebar}
    >
      <Link
        href={subItem.href}
        className={cn(
          'flex items-center px-4 py-3 text-white gap-x-3 group hover:text-white/80 transition-colors rounded-lg ml-4',
          pathname === subItem.href && 'text-cyan-400 hover:text-cyan-400/80'
        )}
      >
        <span className='text-sm'>{subItem.label}</span>
      </Link>
    </li>
  );
}
