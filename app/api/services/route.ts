import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, duration, price, description, branchIds, imageUrl } = await req.json();

    console.log("Request body:", {
      name,
      duration,
      price,
      description,
      branchIds,
      imageUrl,
    });

    const bigIntPrice = BigInt(price);
    const service = await db.service.create({
      data: {
        name,
        duration: parseInt(duration, 10),
        price: bigIntPrice,
        description,
        imageUrl,
      },
    });
    
    await Promise.all(
      branchIds.map((branchId: number) => {
        return db.branchService.create({
          data: {
            branchId,
            serviceId: service.id,
          },
        });
      })
    );

    const responseService = {
      ...service,
      price: service.price.toString(),
    };

    return new NextResponse(JSON.stringify({ service: responseService }), { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return new NextResponse(
      JSON.stringify({ error: "Error creating service" }),
      { status: 500 }
    );
  }
}
