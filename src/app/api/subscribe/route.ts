import { NextRequest, NextResponse } from "next/server";
import { addEmail } from "@/lib/emails";
import { checkRateLimit } from "@/lib/ratelimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "TOO MANY REQUESTS. TRY AGAIN LATER." },
      { status: 429 }
    );
  }

  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID REQUEST." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "INVALID EMAIL ADDRESS." },
      { status: 400 }
    );
  }

  const result = await addEmail(email.toLowerCase());

  if (result === "error") {
    return NextResponse.json(
      { error: "FAILED TO SAVE. TRY AGAIN." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "REQUEST LOGGED. YOU WILL BE CONTACTED." });
}
