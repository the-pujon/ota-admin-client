import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired, parseJwt } from '@/utils/isTokenExpired';

const protectedRoutes = [
  // Dashboard route for all authenticated users
  { path: '/dashboard', roles: ['admin', 'user', 'moderator', 'superAdmin'] },
  
  // Visa Module routes
  { path: '/listVisa', roles: ['admin', 'moderator', 'superAdmin'] },
  { path: '/visaList', roles: ['admin', 'moderator', 'superAdmin'] },
  { path: '/addVisa', roles: ['admin', 'superAdmin'] },
  { path: '/addNewVisa', roles: ['admin', 'superAdmin'] },
  { path: '/addVisa-V2', roles: ['admin', 'superAdmin'] },
  
  // Package Module routes
  { path: '/allPackage', roles: ['admin', 'moderator', 'superAdmin'] },
  { path: '/addPackage', roles: ['admin', 'superAdmin'] },
  
  // Payment Module routes
  { path: '/paymentLists', roles: ['superAdmin'] },
  
  // Auth Module routes (assuming these are admin-only)
  { path: '/user/lists', roles: ['superAdmin'] },
  { path: '/user/add', roles: ['superAdmin'] },
  { path: '/user/manage', roles: ['superAdmin'] },
];

function getRouteProtection(path: string) {
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const exactMatch = protectedRoutes.find(route => route.path === normalizedPath);
  if (exactMatch) return { isProtected: true, requiredRoles: exactMatch.roles };

  for (const route of protectedRoutes) {
    if (normalizedPath.startsWith(route.path) &&
        (normalizedPath.length === route.path.length || normalizedPath[route.path.length] === '/')) {
      return { isProtected: true, requiredRoles: route.roles };
    }
  }
  return { isProtected: false };
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const path = request.nextUrl.pathname;

  // Log middleware execution for debugging
  // console.log('===========================================');
  // console.log('Middleware executed at:', new Date().toISOString());
  // console.log('Pathname:', path);
  // console.log('Access Token exists:', !!token);
  // console.log('Refresh Token exists:', !!refreshToken);
  // console.log('===========================================');

  // Bypass middleware for static assets, public API routes, and auth pages
  if (
    path.startsWith('/_next') || 
    path.startsWith('/api/public') || 
    path.startsWith('/public') || 
    path === '/favicon.ico' ||
    path === '/auth/signin' ||
    path === '/auth/signup'
  ) {
    return NextResponse.next();
  }

  // If on auth pages and user is authenticated, redirect to dashboard
  if (token && !isTokenExpired(token) && (path === '/auth/signin' || path === '/auth/signup' || path === '/')) {
    // console.log('🔄 Redirecting authenticated user from auth page to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check if the route requires protection
  const { isProtected, requiredRoles } = getRouteProtection(path);
  
  // If route is not protected, proceed normally
  if (!isProtected) {
    // console.log('✅ Accessing non-protected route');
    return NextResponse.next();
  }

  // If both tokens are missing, redirect to login
  if (!token && !refreshToken) {
    // console.log('🛑 Missing both tokens - redirecting to signin');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Check refresh token validity
  if (refreshToken && isTokenExpired(refreshToken)) {
    // console.log('🛑 Refresh token expired - clearing cookies and redirecting to signin');
    const response = NextResponse.redirect(new URL('/auth/signin', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }

  // If access token is missing or expired but refresh token is valid,
  // client-side code will handle the token refresh via axios interceptor
  if (!token || isTokenExpired(token)) {
    if (path === '/auth/signin' || path === '/auth/signup') {
      return NextResponse.next();
    }
    
    // For non-auth pages, let the request continue
    // The axios interceptor will handle the token refresh on API requests
    return NextResponse.next();
  }

  try {
    // Parse JWT token to get user role
    const decodedToken = parseJwt(token);
    const userRole = decodedToken.role;
    
    // console.log('👤 User role:', userRole);
    // console.log('🔒 Required roles for this route:', requiredRoles);
    
    // Check if user has required role for this route
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      // console.log('⛔ Insufficient permissions - redirecting to signin');
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // If valid token and proper role, set client-side cookies and proceed
    // console.log('✅ Access granted - proceeding to route');
    const response = NextResponse.next();
    response.cookies.set('role', userRole, { httpOnly: false, path: '/' });
    response.cookies.set('isTokenValid', 'true', { httpOnly: false, path: '/' });

    return response;

  } catch (error) {
    // Handle invalid token
    // console.log('❌ Invalid token error:', error);
    const response = NextResponse.redirect(new URL('/auth/signin', request.url));
    response.cookies.delete('accessToken');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};