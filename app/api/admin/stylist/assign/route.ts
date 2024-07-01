import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL('/not-admin', req.url));
    redirect("/not-admin");
    return null;
  }

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

    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Failed assigning stylists: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed assigning stylists" }),
      { status: 500 }
    );
  }
}
