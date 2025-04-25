import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/auth/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/user", "/dashboard", "/post"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (path == "/" && !session?.username) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (path == "/" && session?.username) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // 4. Redirect
  if (isProtectedRoute && !session?.username) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.username) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
