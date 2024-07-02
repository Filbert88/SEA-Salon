import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { serviceId } = await req.json();

    const reservationsToDelete = await db.reservationService.findMany({
      where: {
        serviceId: serviceId,
      },
      select: {
        reservationId: true
      }
    });

    await db.$transaction(async (prisma) => {
      await prisma.reservationService.deleteMany({
        where: {
          serviceId: serviceId,
        },
      });

      await prisma.branchService.deleteMany({
        where: {
          serviceId: serviceId,
        },
      });

      for (const { reservationId } of reservationsToDelete) {
        await prisma.reservation.delete({
          where: {
            id: reservationId,
          },
        });
      }

      await prisma.service.delete({
        where: {
          id: serviceId,
        },
      });
    });

    return new NextResponse(
      JSON.stringify({ message: "Service and related reservations deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete service and related reservations" }),
      { status: 500 }
    );
  }
}

