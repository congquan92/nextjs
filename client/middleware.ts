import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sessionToken")?.value;

  // Nếu chưa có token => redirect về login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho những path cần bảo vệ
export const config = {
  matcher: ["/me/:path*", "/dashboard/:path*"], // chặn /me và /dashboard
};
