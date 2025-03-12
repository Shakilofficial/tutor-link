import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register-tutor", "/register-student"];

const roleBasedPrivateRoutes = {
  admin: [/^\/admin/],
  tutor: [/^\/tutor/],
  student: [/^\/student/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    // Allow access to login and register pages
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login with the current pathname as redirect
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // If user is authenticated, check if the route matches their role
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];

    // Check if the current path matches the allowed routes for the user's role
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If the role is not authorized for the route, redirect to home
  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin",
    "/admin/:page",
    "/tutor",
    "/tutor/:page",
    "/student",
    "/student/:page",
  ],
};
