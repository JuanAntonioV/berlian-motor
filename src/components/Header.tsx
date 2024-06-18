import { profileMenus } from '@/config/appMenu';
import MenuSearch from './MenuSearch';
import SearchMenuDialog from './SearchMenuDialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MainBreadcrumb from './MainBreadcrumb';
import SidebarMobile from './SidebarMobile';
import { signOut } from '@/lib/auth';
import SignOutButton from './SignOutButton';

export default function Header() {
  return (
    <header className='w-full bg-white border-b border-b-gray-200'>
      <div className='px-4 md:px-10 h-20 flexCenter'>
        <div className='flexBetween w-full'>
          <div className='flexStart gap-x-4'>
            <MenuSearch />
            <SearchMenuDialog />
            <SidebarMobile />
          </div>
          <div className='flexEnd gap-x-4'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='w-12 h-12'>
                  {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-44'>
                {profileMenus.map((menu) => (
                  <DropdownMenuItem key={menu.href}>
                    {menu.label === 'Keluar' ? (
                      <SignOutButton />
                    ) : (
                      <Link
                        href={menu.href}
                        className={cn(
                          'flex items-center gap-x-3 w-full p-1 rounded-lg'
                        )}
                      >
                        {menu.icon}
                        {menu.label}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className='border-t border-t-gray-200 h-12 flexStart px-4 md:px-10'>
        <MainBreadcrumb />
      </div>
    </header>
  );
}
