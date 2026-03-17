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
                password: true,
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

export async function DELETE(
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

        const user = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return NextResponse.json(
            { success: true, user },
            { status: 200 }
        );

    } catch (error) {
        console.error("DELETE USER BY ID ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
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

        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: await req.json(),
        });

        return NextResponse.json(
            { success: true, user },
            { status: 200 }
        );

    } catch (error) {
        console.error("UPDATE USER BY ID ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}