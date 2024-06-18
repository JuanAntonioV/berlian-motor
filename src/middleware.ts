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

const unprotectedRoutes = ['/auth/login'];

const { auth } = NextAuth(authConfig);

async function middleware(req: any) {
  const { nextUrl, auth } = req;

  const user = auth?.user;

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix)
  );

  if (!user && isProtectedRoute) {
    const absoluteURL = new URL('/auth/login', req.nextUrl.origin);
    return NextResponse.rewrite(absoluteURL.toString());
  }
  if (user && unprotectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default auth(middleware);
