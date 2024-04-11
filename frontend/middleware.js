// middleware.js
import { NextResponse } from 'next/server';

export const config = {
    matcher: '/:path*', // This matcher will apply to all routes
};

const Middleware = (req) => {
    const { pathname, origin } = req.nextUrl;

    if (pathname === pathname.toLowerCase()) {
        return NextResponse.next();
    }

    // Redirect to the lowercase version of the URL
    return NextResponse.redirect(new URL(origin + pathname.toLowerCase()));
};

export default Middleware;
