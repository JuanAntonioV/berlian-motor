'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { menus } from '@/config/appMenu';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

type Props = {
  user: User;
};

export default function SearchMenuDialog({ user }: Props) {
  const roleId = user?.role[0];
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  function handleSelect(type: string, id: number) {
    const selected = menus.find((menu) => {
      if (type === 'menu') {
        return menu.id === id;
      } else {
        return menu.subMenus?.find((subMenu) => subMenu.id === id);
      }
    });

    if (selected) {
      setOpen(false);
      router.push(selected.href);
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Cari menu...' />
      <CommandList>
        <CommandEmpty>Menu tidak ditemukan</CommandEmpty>
        {menus
          .filter((menu) => menu.roles?.includes(roleId as number))
          .map((menu) => (
            <Fragment key={`command-search-${menu.label}`}>
              {menu.subMenus && menu.subMenus.length > 0 ? (
                <CommandGroup heading={menu.label}>
                  {menu.subMenus.map((subMenu) => (
                    <Fragment key={`subCommand-search-${subMenu.label}`}>
                      <CommandItem
                        value={subMenu.label}
                        onSelect={() => handleSelect('submenu', subMenu.id)}
                        className='flex items-center gap-1 text-neutral-600 p-4'
                      >
                        {subMenu.label}
                      </CommandItem>
                    </Fragment>
                  ))}
                </CommandGroup>
              ) : (
                <CommandItem
                  className='flex items-center gap-1 text-neutral-600 p-4'
                  value={menu.label}
                  onSelect={() => handleSelect('menu', menu.id)}
                >
                  {menu.label}
                </CommandItem>
              )}
              <CommandSeparator />
            </Fragment>
          ))}
      </CommandList>
    </CommandDialog>
  );
}
