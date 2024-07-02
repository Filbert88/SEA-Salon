import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { stylistId } = await req.json();

    await db.$transaction(async (prisma) => {
        // First, find all reservation IDs linked to the stylist
        const reservations = await prisma.reservation.findMany({
          where: {
            stylistId: stylistId,
          },
          select: {
            id: true, // Only select the reservation IDs
          },
        });

        // Extract the reservation IDs
        const reservationIds = reservations.map(res => res.id);

        // Delete ReservationService entries linked to these reservation IDs
        if (reservationIds.length > 0) {
          await prisma.reservationService.deleteMany({
            where: {
              reservationId: {
                in: reservationIds,
              },
            },
          });
        }

        // Then delete the reservations themselves
        await prisma.reservation.deleteMany({
          where: {
            stylistId: stylistId,
          },
        });

        // Finally, delete the stylist
        await prisma.stylist.delete({
          where: {
            id: stylistId,
          },
        });
      });

    return new NextResponse(
      JSON.stringify({ message: "Stylist deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete stylist"}),
      { status: 500 }
    );
  }
}
