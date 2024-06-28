import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, price, branchId, imageUrl } = await req.json();

    let branch = null;
    if (branchId) {
      branch = await db.branch.findUnique({
        where: { id: parseInt(branchId, 10) },
      });

      if (!branch) {
        return new NextResponse(
          JSON.stringify({ error: "Branch not found" }),
          { status: 400 }
        );
      }
    }

    const newStylist = await db.stylist.create({
      data: {
        name,
        price: BigInt(price),
        ...(branch && { branchId: branch.id }),
        imageUrl
      }
    });

    const responseStylist = {
      ...newStylist,
      price: newStylist.price.toString()
    };

    return new NextResponse(JSON.stringify(responseStylist), { status: 200 });
  } catch (error) {
    console.error("Error creating stylists:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create stylist" }),
      { status: 500 }
    );
  }
}
