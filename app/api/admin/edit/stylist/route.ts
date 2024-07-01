import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { id, name, imageUrl, price } = await req.json();

    const updatedStylist = await db.stylist.update({
      where: { id: parseInt(id, 10) },
      data:{
        ...(name && { name }),
        ...(imageUrl && { imageUrl }),
        ...(price && { price: BigInt(price) }),
      },
    });

    const serializedStylist ={
        ...updatedStylist,
        price: updatedStylist.price.toString(),
    }

    return new NextResponse(JSON.stringify({ updatedStylist:serializedStylist }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating stylist: ", error);
    return NextResponse.json(
      { error: "Failed updating stylist data: " },
      { status: 500 }
    );
  }
}
