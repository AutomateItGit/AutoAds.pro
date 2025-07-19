import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { getToken } from "next-auth/jwt";

function getLocale(request: NextRequest): string {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
  
    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
      locales,
    );
  
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
  
    return locale;
}

export const config = {
    // More specific matcher that excludes static files and specific routes
    matcher: [
        // Include all paths except:
        // - API routes (/api/*)
        // - Next.js internals (/_next/*)
        // - Static files (*.ico, *.png, *.jpg, etc.)
        // - Public folder files
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
        "/fr/dashboard",
        "/en/dashboard",
    ],
};

export async function middleware(request: NextRequest) {


    let token;
    try {
        token = await getToken({ 
            req : request, 
            secret: process.env.AUTH_SECRET,
            secureCookie: process.env.NODE_ENV === 'production'
        });
        console.log('Token retrieval successful:', !!token);
    } catch (error) {
        console.error('Token retrieval error:', error);
        token = null;
    }
    
    
    const { pathname } = request.nextUrl;
    
    console.log('Middleware processing:', pathname);

    // Extract locale from pathname if it exists
    const pathnameLocale = i18n.locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    console.log('Detected locale:', pathnameLocale);

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = !pathnameLocale;

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        console.log('Redirecting to locale:', locale);

        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url,
            ),
        );
    }

    // Remove locale from pathname for internal checks
    const pathnameWithoutLocale = pathnameLocale 
        ? pathname.replace(`/${pathnameLocale}`, '') || '/'
        : pathname;



    // From here on we can check if the user is logged in or whatever we want.
    
    // Check if the user is on the dashboard (after locale)
    const onDashboard = pathnameWithoutLocale === '/dashboard';

    const isLoggedIn = !!token;


    if (isLoggedIn && pathnameWithoutLocale === '/payment' && token?.dashboardAccess) {
        return NextResponse.redirect(new URL(`/${pathnameLocale}/dashboard`, request.url));
    }

    if (isLoggedIn && pathnameWithoutLocale !== '/payment' && onDashboard && !token?.dashboardAccess) {
        return NextResponse.redirect(new URL(`/${pathnameLocale}/payment`, request.url));
    }

    if (onDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL(`/${pathnameLocale}/signin`, request.url));
    }

    if (isLoggedIn && (pathnameWithoutLocale === '/signin' || pathnameWithoutLocale === '/signup')) {
        return NextResponse.redirect(new URL(`/${pathnameLocale}/dashboard`, request.url));
    }



    // If the user is on the dashboard, redirect to the home page with locale
    

    console.log('Middleware allowing request to continue');
    return NextResponse.next();
}