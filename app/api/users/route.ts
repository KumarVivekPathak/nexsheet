import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                employeeId: true,
                empName: true,
                empEmail: true,
                role: true,
                managerName: true,
                managerEmail: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return NextResponse.json(
            { success: true, users },
            { status: 200 }
        );

    } catch (error) {
        console.error("GET USERS ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}