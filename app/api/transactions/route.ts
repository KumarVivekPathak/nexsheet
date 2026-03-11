import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type SearchField = "name" | "email" | "phone" | "order_id";

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const searchType = (searchParams.get("searchType") || "email") as SearchField;

    const assigned_rm = searchParams.get("assigned_rm") || "";
    const manager = searchParams.get("manager") || "";
    const course_type = searchParams.get("course_type") || "";

    const where: Prisma.all_txnsWhereInput = {};

    const searchMap: Record<SearchField, "name" | "email" | "phone" | "order_id"> = {
        name: "name",
        email: "email",
        phone: "phone",
        order_id: "order_id"
    };

    if (search) {
        (where as any)[searchMap[searchType]] = {
            contains: search
        };
    }

    if (assigned_rm) where.assigned_rm = assigned_rm;
    if (manager) where.manager = manager;
    if (course_type) where.course_type = course_type;

    const data = await prisma.all_txns.findMany({
        where,
        orderBy: {
            created_at: "desc"
        },
        take: 100
    });

    return NextResponse.json(data);
};