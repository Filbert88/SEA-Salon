import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { id, name, description, price, imageUrl } = await req.json();
  try {
    const updatedService = await db.service.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: BigInt(price) }),
        ...(imageUrl && { imageUrl }),
      },
    });

    const serializedService = {
        ...updatedService,
        price: updatedService.price.toString(),
      };
    return new NextResponse(JSON.stringify({ updatedService:serializedService }), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to update branch:", error);
    return NextResponse.json(
      { error: "Failed updating branch data: " },
      { status: 500 }
    );
  }
}
