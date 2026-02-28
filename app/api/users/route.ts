import { prisma } from "@/prisma/prisma";

const GET = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            employeeId: true,
            email: true,
            role: true,
            managerName: true,
            createdAt: true,
        }
    });
    return Response.json({ users });
}

export { GET }