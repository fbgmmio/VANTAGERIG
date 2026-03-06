import { NextResponse } from "next/server";
import { getEmails, emailCount } from "@/lib/emails";

// This route is protected by middleware (basic auth)
export async function GET() {
  const entries = getEmails();
  return NextResponse.json({ count: emailCount(), entries });
}
