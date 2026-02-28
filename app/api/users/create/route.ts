import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        const { employeeId, email, password, role, managerName } = await req.json();

        // Validations
        if (!employeeId || !email || !password || !role) {
            return Response.json({ error: "employeeId, email, password and role are required" }, { status: 400 });
        }

        if (!["USER", "ADMIN", "MANAGER"].includes(role)) {
            return Response.json({ error: "Role must be USER, ADMIN or MANAGER" }, { status: 400 });
        }

        if (!email.endsWith("@thebatraanumerology.com")) {
            return Response.json({ error: "Email must be from @thebatraanumerology.com domain" }, { status: 400 });
        }

        if (password.length < 6) {
            return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        // Check existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { employeeId }
                ]
            }
        });

        if (existingUser?.email === email) {
            return Response.json({ error: "Email already exists" }, { status: 409 });
        }

        if (existingUser?.employeeId === employeeId) {
            return Response.json({ error: "Employee ID already exists" }, { status: 409 });
        }


        const user = await prisma.user.create({
            data: {
                employeeId,
                email,
                password,
                role,
                managerName: managerName || null,
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

        return Response.json({ message: "User created successfully", user }, { status: 201 });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}