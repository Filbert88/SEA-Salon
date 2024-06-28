import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      location,
      openingTime,
      closingTime,
      description,
      phone,
      selectedStylists,
    } = await req.json();

    if (!name || !location || !openingTime || !closingTime || !phone) {
      return new NextResponse(
        JSON.stringify({ message: "Required fields are missing" }),
        { status: 400 }
      );
    }

    const baseDate = new Date().toISOString().substring(0, 10); 
    const openingDateTime = new Date(`${baseDate}T${openingTime}:00`).toISOString();
    const closingDateTime = new Date(`${baseDate}T${closingTime}:00`).toISOString();

    const newBranch = await db.$transaction(async (prisma) => {
      const branch = await prisma.branch.create({
        data: {
          name,
          location,
          openingTime: openingDateTime,
          closingTime: closingDateTime,
          description,
          phone,
        },
      });

      if (selectedStylists && selectedStylists.length > 0) {
        const updates = await Promise.all(
          selectedStylists.map(async (stylistId: number) => {
            try {
              return await prisma.stylist.update({
                where: { id: stylistId },
                data: { branchId: branch.id },
              });
            } catch (updateError) {
              console.error(`Failed to update stylist ${stylistId}:`, updateError);
              throw updateError; // Rethrow to be caught by transaction error handling
            }
          })
        );
        console.log("Updated stylists:", updates);
      }

      return branch;
    });

    return new NextResponse(JSON.stringify(newBranch), { status: 200 });
  } catch (error) {
    console.error("Failed to create branch and assign stylists:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create branch" }),
      { status: 500 }
    );
  }
}
