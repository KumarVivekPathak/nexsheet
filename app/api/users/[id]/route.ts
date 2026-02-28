import { prisma } from "@/prisma/prisma";

const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            employeeId: true,
            email: true,
            role: true,
            managerName: true,
            createdAt: true,
        }
    });
    return Response.json({ user });
}

export { GET };