import { prisma } from "@/prisma/prisma";

const GET = async () => {
    const users = await prisma.rm_table.findMany();
    return Response.json({ users })
}

export { GET }