'use client';

import { User } from 'next-auth';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { HiMenuAlt2 } from 'react-icons/hi';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import BrandLogo from './BrandLogo';
import NavServerList from './MobileNavList';
import NavLists from './NavLists';

type Props = {
  user: User;
};

export default function MobileNavList({ user }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' size={'icon'}>
          <HiMenuAlt2 size={28} className='text-neutral-800' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className='overflow-y-auto px-0 bg-black border-none max-w-80'
      >
        <SheetHeader className='px-6'>
          <SheetTitle className='mt-4'>
            <BrandLogo />
          </SheetTitle>
        </SheetHeader>

        <NavLists closeSidebar={() => setOpen(false)} user={user} />
      </SheetContent>
    </Sheet>
  );
}
