import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; 

export async function POST(req: NextRequest) {
    const { serviceId, branches } = await req.json();
    try {
        const existingAssociations = await db.branchService.findMany({
            where: {
                serviceId: serviceId,
                branchId: { in: branches },
            },
            include: {
                branch: true,
            },
        });

        if (existingAssociations.length > 0) {
            const branchNames = existingAssociations.map(assoc => assoc.branch.name).join(', ');
            return new NextResponse(JSON.stringify({
                message: `Service is already associated with the following branch(es): ${branchNames}.`
            }), { status: 400 });
        }

        const newAssociations = branches.map((branchId: number) => ({
            serviceId: serviceId,
            branchId: branchId,
        }));

        const result = await db.branchService.createMany({
            data: newAssociations,
            skipDuplicates: true,
        });

        return new NextResponse(JSON.stringify({
            message: 'New associations created successfully.',
            result: result
        }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Failed to create new associations.',
        }), { status: 500 });
    }
}
