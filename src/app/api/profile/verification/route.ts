import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

function createVerificationCode(): string {
  return randomBytes(16).toString("hex");
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const verification = await db.forumVerification.findUnique({
    where: { forumId: user.id },
    select: { forumId: true, verifyCode: true },
  });

  return NextResponse.json({
    forumId: user.id,
    verified: verification !== null,
    verifyCode: verification?.verifyCode ?? null,
  });
}

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const verification = await db.forumVerification.upsert({
    where: { forumId: user.id },
    update: { verifyCode: createVerificationCode() },
    create: { forumId: user.id, verifyCode: createVerificationCode() },
    select: { forumId: true, verifyCode: true },
  });

  return NextResponse.json({
    forumId: verification.forumId,
    verified: true,
    verifyCode: verification.verifyCode,
  });
}
