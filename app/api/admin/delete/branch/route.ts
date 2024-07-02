import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { branchId } = await req.json();

    await db.$transaction(async (prisma) => {
      await prisma.stylist.updateMany({
        where: {
          branchId: branchId,
        },
        data: {
          branchId: null,
        },
      });

      await prisma.reservation.deleteMany({
        where: {
          branchId: branchId,
        },
      });

      await prisma.branchService.deleteMany({
        where: {
          branchId: branchId,
        },
      });

      await prisma.branch.delete({
        where: {
          id: branchId,
        },
      });
    });

    return new NextResponse(
      JSON.stringify({ message: "Branch deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete branch" }),
      { status: 500 }
    );
  }
}
