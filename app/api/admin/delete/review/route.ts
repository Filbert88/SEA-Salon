import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"; 

export async function POST(req: NextRequest) {
    try {
        const { reviewId } = await req.json();

        await db.review.delete({
            where: {
                id: reviewId,
            },
        });

        return new NextResponse(JSON.stringify({ message: "Review deleted successfully" }), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to delete review" }), { status: 500 });
    }
}
