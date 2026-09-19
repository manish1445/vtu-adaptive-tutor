import { NextResponse } from "next/server";
import { calculateStudentMastery } from "@/lib/engine";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let userId: string | null = searchParams.get("userId");

    // MVP fallback: use the first user. Later, read this from the session.
    if (!userId) {
      const user = await prisma.user.findFirst();
      if (!user) {
        return NextResponse.json({ error: "No user found" }, { status: 404 });
      }
      userId = user.id;
    }

    const masteryData = await calculateStudentMastery(userId as string);
    return NextResponse.json(masteryData, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to calculate mastery" }, { status: 500 });
  }
}
