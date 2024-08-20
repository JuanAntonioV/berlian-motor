import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './config/authConfig';

const protectedRoutes = [
  '/',
  '/dashboard',
  '/akun-saya',
  '/kelola-karyawan',
  '/kelola-kategori',
  '/kelola-merek',
  '/kelola-produk',
  '/kelola-rak',
];

const staffRoutes = ['/', '/dashboard', '/akun-saya'];

const unprotectedRoutes = ['/auth/login'];

const { auth } = NextAuth(authConfig);

async function middleware(req: any) {
  const { nextUrl, auth } = req;

  const user = auth?.user;
  const roleId = user?.role[0];

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    nextUrl.pathname.startsWith(prefix)
  );

  if (!user && isProtectedRoute) {
    const absoluteURL = new URL('/auth', nextUrl.origin);
    return NextResponse.rewrite(absoluteURL.toString());
  }
  if (user && unprotectedRoutes.includes(nextUrl.pathname)) {
    const absoluteURL = new URL('/dashboard', nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // if (roleId === 3 && !staffRoutes.includes(nextUrl.pathname)) {
  //   const absoluteURL = new URL('/dashboard', nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default auth(middleware);
