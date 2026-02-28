import { prisma } from "@/prisma/prisma";

const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const user = await prisma.rm_table.findUnique({
        where: {
            id: Number(id)
        }
    });
    return Response.json({ user });
}

export { GET };