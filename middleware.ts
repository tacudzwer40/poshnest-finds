import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'poshnest_session';

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) return false;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return typeof payload.username === 'string';
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  if (
    pathname === '/login' ||
    pathname.startsWith('/api/admin/login')
  ) {
    return NextResponse.next();
  }

  // Protected: /admin/* and /api/admin/*
  const isAdminRoute =
    pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  if (!isAdminRoute) return NextResponse.next();

  const authed = await isAuthenticated(req);
  if (authed) return NextResponse.next();

  // API: return 401 JSON
  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Page: redirect to /login
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};