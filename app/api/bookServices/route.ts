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
      include: {
        services: {
          select: {
            service: {
              select: {
                id: true,
                name: true,
                duration: true,
                imageUrl: true,
                price: true,
                description: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!branches.length) {
      return new NextResponse(
        JSON.stringify({ error: "Branch not found" }),
        { status: 404 }
      );
    }

    const branch = branches[0];

    const services = branch.services.map(bs => ({
      ...bs.service,
      price: bs.service.price.toString(), 
    }));

    return new NextResponse(JSON.stringify(services), { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch services due to server error" }),
      { status: 500 }
    );
  }
}
