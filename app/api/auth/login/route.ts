import { prisma } from "@/prisma/prisma";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json();

        // Validations
        if (!email || !password) {
            return Response.json({ error: "Email and password are required" }, { status: 400 });
        }

        if (!email.endsWith("@thebatraanumerology.com")) {
            return Response.json({ error: "Email must be from @thebatraanumerology.com domain" }, { status: 400 });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Plain text password check
        if (user.password !== password) {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                employeeId: user.employeeId,
                email: user.email,
                role: user.role,
                managerName: user.managerName,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const { password: _, ...userWithoutPassword } = user;

        return Response.json({
            message: "Login successful",
            token,
            user: userWithoutPassword
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}