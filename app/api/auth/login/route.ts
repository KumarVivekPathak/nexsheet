import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // 1️⃣ Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        if (!email.endsWith("@thebatraanumerology.com")) {
            return NextResponse.json(
                { success: false, message: "Invalid email domain" },
                { status: 400 }
            );
        }

        // 2️⃣ Find user
        const user = await prisma.user.findUnique({
            where: { empEmail: email }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // 3️⃣ Plain text password check
        if (user.password !== password) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // 4️⃣ Check JWT Secret
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }

        // 5️⃣ Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                employeeId: user.employeeId,
                empEmail: user.empEmail,
                empName: user.empName,
                role: user.role,
                managerName: user.managerName,
                managerEmail: user.managerEmail,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 6️⃣ Remove password before sending
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                token,
                user: userWithoutPassword,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}