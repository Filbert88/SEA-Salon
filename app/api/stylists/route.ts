import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const branchName = searchParams.get("branch");

    console.log("Received request with query:", searchParams.toString());
    console.log("Branch name extracted:", branchName);

    if (!branchName) {
      return new NextResponse(
        JSON.stringify({ error: "Branch name parameter is required" }),
        { status: 400 }
      );
    }

    const branches = await db.branch.findMany({
      where: { name: branchName },
    });

    if (!branches) {
      return new NextResponse(
        JSON.stringify({ error: "Branch not found" }),
        { status: 404 }
      );
    }

    const branch = branches[0];

    const stylists = await db.stylist.findMany({
      where: { branchId: branch.id },
    });

    const serializedStylists = stylists.map(stylist => ({
      ...stylist,
      price: stylist.price.toString(), 
    }));

    return new NextResponse(JSON.stringify(serializedStylists), { status: 200 }); 
  } catch (error) {
    console.error("Error fetching stylists:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch stylists due to server error" }),
      { status: 500 }
    );
  }
}
