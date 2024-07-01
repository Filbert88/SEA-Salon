import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { stylistIds, branchId } = await req.json();

    const data = await db.stylist.updateMany({
      where: {
        id: { in: stylistIds },
      },
      data: {
        branchId: parseInt(branchId, 10),
      },
    });

    return NextResponse.json({data}, {status:200});
  } catch (error) {
    console.error("Failed assigning stylists: ", error);
    return NextResponse.json(
      { error: "Failed assigning stylists:" },
      { status: 500 }
    );
  }
}
