import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type SearchField = "name" | "email" | "contact" | "order_id";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const searchType = (searchParams.get("searchType") || "email") as SearchField;
    const assigned_rm = searchParams.get("assigned_rm") || "";
    const manager = searchParams.get("manager") || "";
    const course_type = searchParams.get("course_type") || "";
    const date_from = searchParams.get("date_from") || "";
    const date_to = searchParams.get("date_to") || "";
    const where: Prisma.all_txnsWhereInput = {};

    const searchMap: Record<SearchField, "name" | "email" | "contact" | "order_id"> = {
        name: "name",
        email: "email",
        contact: "contact",
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
    if (date_from || date_to) {
        const toDate = date_to ? new Date(date_to) : undefined;
        if (toDate) toDate.setHours(23, 59, 59, 999); // make end date inclusive
        where.created_at = {
            ...(date_from && { gte: new Date(date_from) }),
            ...(toDate && { lte: toDate }),
        };
    }
    const data = await prisma.all_txns.findMany({
        where,
        orderBy: {
            created_at: "desc"
        },
        take: 20
    });

    return NextResponse.json(data);
}