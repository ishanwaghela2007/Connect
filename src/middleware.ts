// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/pages/dashboard', '/pages/profile', '/pages/settings'];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const sessionCookie = request.cookies.get(`a_session_${projectId}`);

  if (!sessionCookie) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/pages/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // only these paths are protected
};