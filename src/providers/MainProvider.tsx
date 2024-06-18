'use client';

import { setDefaultOptions } from 'date-fns';
import { id } from 'date-fns/locale';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

setDefaultOptions({
  locale: id,
});

export default function Provider({ children }: PropsWithChildren) {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
      <NextTopLoader />
      <Toaster position='bottom-right' reverseOrder={false} />
    </div>
  );
}
