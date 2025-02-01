import { metadata } from "./app/layout";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const sessionClaims = (await auth()).sessionClaims as {
    metadata?: { role?: string };
  };
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
