import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weekOffset = parseInt(searchParams.get("weekOffset") || "0", 10);

    // Calculate week boundaries (Monday to Sunday)
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const slots = await prisma.weeklyAgendaSlot.findMany({
      where: {
        weekStart: monday,
      },
      orderBy: [{ dayOfWeek: "asc" }, { period: "asc" }],
    });

    return NextResponse.json({ slots, weekStart: monday, weekEnd: sunday });
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json(
      { error: "Failed to fetch agenda" },
      { status: 500 }
    );
  }
}
