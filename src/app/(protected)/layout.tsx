import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { PropsWithChildren } from 'react';

type Props = {};
export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full h-screen flex text-gray-900 bg-gray-100'>
      <Sidebar />
      <main className='flex-1 w-px'>
        <Header />
        <main className='py-7 px-4 md:px-10 h-[calc(100vh-129px)] overflow-y-auto'>
          {children}
        </main>
      </main>
    </div>
  );
}
