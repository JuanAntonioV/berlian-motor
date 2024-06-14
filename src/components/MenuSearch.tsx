'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { menus } from '@/config/appMenu';

export default function MenuSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

    return;
  }

  return (
    <div className='hidden lg:block w-full relative'>
      <Command className='border'>
        <CommandInput
          className='w-full'
          placeholder='Cari menu...'
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        <CommandList
          hidden={!open}
          className='absolute top-full !bg-white w-full rounded-lg shadow-lg mt-2 z-10'
        >
          <CommandEmpty>Menu tidak ditemukan</CommandEmpty>
          {menus.map((menu) => (
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
      </Command>
    </div>
  );
}
