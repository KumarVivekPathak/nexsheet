import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/prisma"
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await prisma.user.findMany({
        where: {
            role: "ADMIN"
        },
        distinct: ['empName'],
        select: {
            id: true,
            empName: true
        }
    })

    return NextResponse.json(data);
}