import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const { stylistId, startTime, endTime } = await req.json();

  if (!stylistId || !startTime || !endTime) {
    return NextResponse.json({message:"Missing required parameters"}, {status:400})
  }

  try {
    const overlappingReservations = await prisma.reservation.findMany({
      where: {
        stylistId,
        AND: [
          {
            OR: [
              {
                date: {
                  lte: new Date(startTime),
                },
                endTime: {
                  gt: new Date(startTime),
                },
              },
              {
                date: {
                  lt: new Date(endTime),
                },
                endTime: {
                  gte: new Date(endTime),
                },
              },
              {
                date: {
                  gte: new Date(startTime),
                },
                endTime: {
                  lte: new Date(endTime),
                },
              }
            ],
          },
        ],
      },
    });

    const isAvailable = overlappingReservations.length === 0;
    console.log(isAvailable)
    console.log("aman")
    return NextResponse.json({isAvailable}, {status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to check stylist availability" },
      { status: 500 }
    );
  }
}
