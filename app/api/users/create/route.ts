import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        const {
            employee_id,
            emp_name,
            emp_email,
            password,
            role,
            manager_name,
            manager_email
        } = await req.json();

        // Validations
        if (!employee_id || !emp_email || !password || !role) {
            return Response.json(
                { error: "employeeId, email, password and role are required" },
                { status: 400 }
            );
        }

        if (!["USER", "ADMIN", "MANAGER"].includes(role)) {
            return Response.json(
                { error: "Role must be USER, ADMIN or MANAGER" },
                { status: 400 }
            );
        }

        if (!emp_email.endsWith("@thebatraanumerology.com")) {
            return Response.json(
                { error: "Email must be from @thebatraanumerology.com domain" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return Response.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { empEmail: emp_email },
                    { employeeId: employee_id }
                ]
            }
        });

        if (existingUser?.empEmail === emp_email) {
            return Response.json({ error: "Email already exists" }, { status: 409 });
        }

        if (existingUser?.employeeId === employee_id) {
            return Response.json({ error: "Employee ID already exists" }, { status: 409 });
        }

        if (
            manager_email &&
            !manager_email.endsWith("@thebatraanumerology.com")
        ) {
            return Response.json(
                { error: "Manager email must be from @thebatraanumerology.com domain" },
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: {
                employeeId: employee_id,
                empName: emp_name,
                empEmail: emp_email,
                password: password,
                role,
                managerName: manager_name || null,
                managerEmail: manager_email || null,
            },
            select: {
                id: true,
                employeeId: true,
                empName: true,
                empEmail: true,
                role: true,
                managerName: true,
                managerEmail: true,
                createdAt: true,
            }
        });

        return Response.json(
            { message: "User created successfully", user },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};