import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATHS = ["/admin", "/api/admin"];

function isAdminPath(pathname: string) {
  return ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  if (!isAdminPath(req.nextUrl.pathname)) return NextResponse.next();

  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    // If no secret is set, block admin entirely
    return new NextResponse("Admin not configured.", { status: 503 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const [scheme, encoded] = auth.split(" ");

  if (scheme?.toLowerCase() !== "basic" || !encoded) {
    return unauthorized();
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const colonIdx = decoded.indexOf(":");
  const password = colonIdx >= 0 ? decoded.slice(colonIdx + 1) : "";

  // Constant-time comparison to prevent timing attacks
  if (!timingSafeEqual(password, secret)) {
    return unauthorized();
  }

  return NextResponse.next();
}

function unauthorized() {
  return new NextResponse("Unauthorized.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
