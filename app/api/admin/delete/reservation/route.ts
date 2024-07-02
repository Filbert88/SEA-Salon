import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reservationId } = await req.json();

    await db.$transaction(async (prisma) => {
      await prisma.reservationService.deleteMany({
        where: {
          reservationId: reservationId,
        },
      });

      await prisma.reservation.delete({
        where: {
          id: reservationId,
        },
      });
    });

    return new NextResponse(
      JSON.stringify({ message: "Reservation deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete reservation" }),
      { status: 500 }
    );
  }
}
