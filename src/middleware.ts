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
  { path: '/user/lists', roles: ['superAdmin', 'admin'] },
  { path: '/user/add', roles: ['superAdmin', 'admin'] },
  { path: '/user/manage', roles: ['superAdmin', 'admin'] },
];
 
// Fix the route matching to be more reliable
function getRouteProtection(path: string) {
  // Normalize path to not have trailing slash
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
 
  // First check for exact matches
  const exactMatch = protectedRoutes.find(route => route.path === normalizedPath);
  if (exactMatch) return { isProtected: true, requiredRoles: exactMatch.roles };
 
  // Then check for nested routes
  for (const route of protectedRoutes) {
    // Simple path.startsWith check is more reliable
    if (normalizedPath.startsWith(route.path + '/')) {
      return { isProtected: true, requiredRoles: route.roles };
    }
  }
 
  return { isProtected: false };
}
 
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const path = request.nextUrl.pathname;
 
  // Skip the middleware for static and public routes
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
 
  // Get route protection info ONCE and store it
  // This prevents inconsistent results if called multiple times
  const routeProtection = getRouteProtection(path);
 
  const isTokenExpire = isTokenExpired(token as string)
 
  // If on auth pages and user is authenticated, redirect to dashboard
  if (token && (path === '/auth/signin' || path === '/auth/signup' || path === '/')) {
    console.log("comming here")
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
 
  // If route is not protected, proceed normally
  if (!routeProtection.isProtected) {
    return NextResponse.next();
  }
 
  // For protected routes, enforce permissions strictly
  // This is the key change that prevents the bypass
  if (token) {
    console.log("not allowed")
    try {
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.role;
      console.log("userRole", userRole)
 
      console.log("!routeProtection.requiredRoles!.includes(userRole)", !routeProtection.requiredRoles!.includes(userRole))
 
      // Critical fix: Always check role permissions before allowing access
      if (!routeProtection.requiredRoles!.includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
 
      // User has proper role, proceed with request
      const response = NextResponse.next();
      response.cookies.set('role', userRole, { httpOnly: false, path: '/' });
      response.cookies.set('isTokenValid', 'true', { httpOnly: false, path: '/' });
      return response;
    } catch (error) {
      console.log("going")
      // Invalid token
      const response = NextResponse.redirect(new URL('/auth/signin', request.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }
 
  // If both tokens are missing, redirect to login
  if (!token && !refreshToken) {
    console.log("If both tokens are missing, redirect to login")
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
 
  // Check refresh token validity
  if (refreshToken && isTokenExpired(refreshToken)) {
    const response = NextResponse.redirect(new URL('/auth/signin', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
 
  // If we get here, the access token is missing or expired but refresh token is valid
  // This is when we'd normally let the client handle token refresh via axios interceptor
  // However, for protected routes, we'll redirect to signin to ensure security
 
  console.log("going through here")
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
 
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};