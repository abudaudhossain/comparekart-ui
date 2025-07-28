import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    //console.log("Middleware: ", request.url)

    const pathname = request.nextUrl.pathname;

    const user = request.cookies.get("user_info");
    //console.log(user)
    if (pathname.startsWith("/signin") || pathname.startsWith("/signup") || pathname.startsWith("/confirm-email") || pathname.startsWith("/resend-confirmation")) {
        if (user) {
            //console.log("user has");
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (!user) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/dashboard",
        "/signin",
        "/resend-confirmation",
        "/confirm-email",
        "/signup",
        "/dashboard/profile",

    ],
};
