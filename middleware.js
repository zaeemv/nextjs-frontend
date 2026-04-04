import { NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/customers'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the current path is protected
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Check for the token cookie
    const token = request.cookies.get('token');

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};