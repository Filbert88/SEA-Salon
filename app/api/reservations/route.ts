import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface Service {
  serviceId: string;
  duration: string;
}

interface Guest {
  name: string;
  phone: string;
}

export async function POST(req: NextRequest) {
  console.log("masukk")
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { branchName, services, stylistId, date, time, guests, totalPrice } =
      await req.json();

      console.log("Request body:", {
        branchName,
        services,
        stylistId,
        date,
        time,
        guests,
        totalPrice,
      });

    if (!branchName || services.length === 0 || !date || !time) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const branch = await db.branch.findFirst({
      where: { name: branchName },
    });

    if (!branch) {
      return NextResponse.json(
        { message: "Branch not found" },
        { status: 404 }
      );
    }

    const totalDuration = (services as Service[]).reduce(
      (total: number, service: Service) => total + Number(service.duration),
      0
    );
    const startTime = new Date(`${date} ${time}`);
    const endTime = new Date(startTime.getTime() + totalDuration * 60000); 

    const reservation = await db.reservation.create({
      data: {
        userId: Number(session.user.id),
        branchId: branch.id,
        stylistId: parseInt(stylistId),
        date: new Date(date),
        time,
        endTime,
        price: BigInt(totalPrice),
        services: {
          create: (services as Service[]).map((service) => ({
            serviceId: parseInt(service.serviceId),
          })),
        },
        guests: {
          create: guests.map((guest: Guest) => ({
            name: guest.name,
            phone: guest.phone,
          })),
        },
      },
      include: {
        branch: true,
        stylist: true,
        services: true,
        guests: true,
      },
    });

    const reservationSerialized = {
      ...reservation,
      price: reservation.price.toString(),
      stylist: {
        ...reservation.stylist,
        price: reservation.stylist.price.toString(),
      },
    };

    console.log("Reservation created:", reservationSerialized);
    return NextResponse.json({reservationSerialized}, {status:200});
  } catch (error) {
    console.error("Reservation creation failed:", error);
    return NextResponse.json(
        { error: "Failed to create reservation" },
        { status: 500 }
      );
  }
}
