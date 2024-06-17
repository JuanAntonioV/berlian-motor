'use client';

import { cn } from '@/lib/utils';
import { TMenu } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import NavSubItem from './NavSubItem';

type Props = {
  item: TMenu;
  closeSidebar?: () => void;
};

export default function NavItem({ item, closeSidebar }: Props) {
  const pathname = usePathname();

  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);

  return (
    <>
      {item.subMenus && item.subMenus.length > 0 ? (
        <li>
          <div className='mx-4'>
            <button
              className={cn(
                'flexBetween p-3 text-white gap-x-3 w-full hover:text-white group hover:bg-neutral-800 transition-colors rounded-lg',
                pathname === item.href && 'text-white bg-neutral-800'
              )}
              onClick={() =>
                setShowSubMenu((prev) =>
                  prev === item.href ? null : item.href
                )
              }
            >
              <span
                className={cn(
                  'absolute w-1.5 h-8 bg-white rounded-r-full left-0 scale-y-0 transition-transform -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 ease-in-out',
                  pathname === item.href && 'scale-y-100 translate-x-0'
                )}
              ></span>

              <div className='flex gap-x-3 items-center'>
                {item.icon}
                <span className='font-semibold text-sm'>{item.label}</span>
              </div>

              {showSubMenu === item.href ? (
                <IoIosArrowUp size={16} />
              ) : (
                <IoIosArrowDown size={16} />
              )}
            </button>
          </div>
          {showSubMenu === item.href && item.subMenus && (
            <ul className='space-y-2 bg-neutral-900'>
              {item.subMenus.map((subItem) => (
                <NavSubItem key={`subitem-${subItem.href}`} subItem={subItem} />
              ))}
            </ul>
          )}
        </li>
      ) : (
        <li onClick={closeSidebar} className='mx-4'>
          <Link
            href={item.href}
            className={cn(
              'flex items-center p-3 text-white gap-x-3 hover:text-white group hover:bg-neutral-800 transition-colors rounded-lg',
              pathname.includes(item.href) && 'text-white bg-neutral-800'
            )}
          >
            <span
              className={cn(
                'absolute w-1.5 h-8 bg-white rounded-r-full left-0 scale-y-0 transition-transform -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 ease-in-out',
                pathname.includes(item.href) && 'scale-y-100 translate-x-0'
              )}
            ></span>
            {item.icon}
            <span className='font-semibold text-sm'>{item.label}</span>
          </Link>
        </li>
      )}
    </>
  );
}
