import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { trackPageView } from '@/lib/stats';

// Simple hash function for Edge runtime (using built-in Web Crypto API)
async function hashString(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(request: NextRequest) {
    // Check if it's an admin route
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for admin session cookie
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Track page views for non-admin, non-static routes
    const isStaticAsset = request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf)$/);
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    if (!isStaticAsset && !isApiRoute && !isAdminRoute) {
        // Create a visitor ID from IP address (hashed for privacy)
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const visitorId = await hashString(ip);

        // Track the page view (async, don't await to avoid slowing down the response)
        trackPageView(visitorId).catch(err => console.error('Failed to track page view:', err));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
