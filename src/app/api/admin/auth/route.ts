import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK_PASSWORD = "nakd3651@";
const COOKIE_NAME = "admin_auth";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

async function sha256(text: string): Promise<string> {
  const buffer = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = (await request.json()) as { password?: unknown };
    const expectedPassword = process.env.ADMIN_PASSWORD ?? FALLBACK_PASSWORD;

    if (typeof password !== "string" || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const hash = await sha256(expectedPassword);
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    });
    return response;
  } catch (err) {
    console.error("[admin:auth:POST]", err);
    return NextResponse.json(
      { success: false, error: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
