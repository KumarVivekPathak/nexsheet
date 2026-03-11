import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server";

export const GET = async () => {
    const data = await prisma.all_txns.findMany({
        where: {
            course_type: {
                not: null
            }
        },
        distinct: ['course_type'],
        select: {
            course_type: true
        }
    })

    const formatted = data.map((item, index) => ({
        id: index + 1,
        course_type: item.course_type
    }));

    return NextResponse.json(formatted);
}