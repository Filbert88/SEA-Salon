import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { id, name, description, location, phone, openingTime, closingTime } =
    await req.json();
  try {
    const updatedBranch = await db.branch.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(location && { location }),
        ...(phone && { phone }),
        ...(openingTime && { openingTime }),
        ...(closingTime && { closingTime }),
      },
    });
    return new NextResponse(JSON.stringify({ updatedBranch }), {
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
