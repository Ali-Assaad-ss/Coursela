// middleware.js
import { NextResponse } from "next/server";

export const config = {
  matcher: "/:path*", // This matcher will apply to all routes
};

const  Middleware = async (req) => {
  const { pathname, origin } = req.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(origin + pathname.toLowerCase()));
  }
  if (pathname.includes("/admin") && !pathname.includes("/api")) {
        const response = await fetch(new URL(origin + "/api/admin/validate"), {
          headers: {
            cookie: req.cookies,
          },
        });
      if (response.status !== 200) {
        console.log("response status: ", response.statusText);

        return NextResponse.redirect(new URL(origin + "/login"));
      }
      
    }
  // Redirect to the lowercase version of the URL
  return NextResponse.next();
};

export default Middleware;
