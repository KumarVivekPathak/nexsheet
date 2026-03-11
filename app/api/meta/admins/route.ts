import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server";

export const GET = async () => {
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