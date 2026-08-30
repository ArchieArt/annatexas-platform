import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Areas that guests (lightweight visitor pass) may NOT enter.
// Guests get the open, public community pages only — no member dashboard,
// no Meet Your Neighbors, and no City Services.
const GUEST_BLOCKED_PREFIXES = ['/neighbors', '/city-services', '/dashboard', '/onboarding', '/settings', '/opportunity-center', '/my-anna', '/citynest', '/edc', '/nonprofit', '/grants'];

// Member-only areas that require a login. Everything else (home, community,
// directory, magazine, etc.) stays public. Kept in sync with the guest list.
const PROTECTED_PREFIXES = ['/dashboard', '/my-anna', '/opportunity-center', '/citynest', '/edc', '/grants', '/nonprofit', '/onboarding', '/settings', '/mercy', '/welcome-survey'];

// The single surface a Sponsorship login may see.
const SPONSOR_HOME = '/magazine/edition';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token as any;
    const path = req.nextUrl?.pathname ?? '';
    const role = token?.role;

    // ---- Sponsorship login: locked to the digital magazine edition only ----
    // No community feed, business directory, artist portal, or dashboard.
    if (role === 'SPONSOR') {
      const allowed =
        path === SPONSOR_HOME ||
        path.startsWith(SPONSOR_HOME + '/') ||
        path.startsWith('/login') ||
        path.startsWith('/logout');
      if (!allowed) {
        return NextResponse.redirect(new URL(SPONSOR_HOME, req.url));
      }
      return NextResponse.next();
    }

    // ---- Guest gating: send guests back to their hub for member-only areas ----
    if (role === 'GUEST') {
      if (GUEST_BLOCKED_PREFIXES.some((p) => path === p || path.startsWith(p + '/') || path.startsWith(p))) {
        return NextResponse.redirect(new URL('/guest-hub', req.url));
      }
    }

    // Admin console - owner only
    // Mercy — operator-only daily briefing
    if (path.startsWith('/mercy') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (path.startsWith('/dashboard/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Municipality (City) insights - CITY staff and ADMIN only (NOT chamber)
    if (path.startsWith('/dashboard/municipality') && role !== 'CITY' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Chamber insights - CHAMBER staff and ADMIN only (NOT city)
    if (path.startsWith('/dashboard/chamber') && role !== 'CHAMBER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Provider routes - allow PROVIDER and ADMIN, redirect others to general dashboard
    if (path.startsWith('/dashboard/provider') && role !== 'PROVIDER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Anna Opportunity Center (EDC arm) - EDC staff and ADMIN only
    if (path.startsWith('/opportunity-center') && role !== 'EDC' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Redirect based on role to appropriate dashboard
    if (path === '/dashboard') {
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/admin', req.url));
      }
      if (role === 'CITY') {
        return NextResponse.redirect(new URL('/dashboard/municipality', req.url));
      }
      if (role === 'CHAMBER') {
        return NextResponse.redirect(new URL('/dashboard/chamber', req.url));
      }
      if (role === 'PROVIDER') {
        return NextResponse.redirect(new URL('/dashboard/provider', req.url));
      }
      if (role === 'EDC') {
        return NextResponse.redirect(new URL('/opportunity-center', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl?.pathname ?? '';
        // Only the member-only areas require a login. Every other route
        // (home, community, directory, magazine, etc.) is public — we still run
        // the middleware fn on them so the Sponsorship lock above can apply.
        const isProtected = PROTECTED_PREFIXES.some(
          (p) => path === p || path.startsWith(p + '/'),
        );
        if (!isProtected) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  // Run on every page (so the Sponsorship lock can apply everywhere) EXCEPT
  // API routes, Next internals, and static asset files (anything with a dot).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
