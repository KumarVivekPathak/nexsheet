import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = Number(id);

        // Validate ID
        if (!id || isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "Invalid user ID" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                employeeId: true,
                empName: true,
                empEmail: true,
                role: true,
                managerName: true,
                managerEmail: true,
                createdAt: true,
            }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, user },
            { status: 200 }
        );

    } catch (error) {
        console.error("GET USER BY ID ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}