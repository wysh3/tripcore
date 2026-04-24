import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const session = req.auth;
  const isAuth = !!session;
  
  // In NextAuth v5, the user object is directly on the session (req.auth)
  const user = session?.user as any;
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // If authenticated but not admin, redirect to home
    if (!isAdmin) {
      console.log("Access denied for role:", user?.role);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
