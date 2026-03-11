import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server";

export const GET = async () => {
    const data = await prisma.user.findMany({
        where: {
            role: "USER"
        },
        distinct: ['empName'],
        select: {
            id: true,
            empName: true
        }
    })

    return NextResponse.json(data);
}