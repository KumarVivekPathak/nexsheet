import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma";

const handler = NextAuth({
    providers: [
        // Google Login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Email/Password Login
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                if (!credentials.email.endsWith("@thebatraanumerology.com")) {
                    throw new Error("Email must be from @thebatraanumerology.com domain");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                if (user.password !== credentials.password) {
                    throw new Error("Invalid password");
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.employeeId,
                    role: user.role,
                    employeeId: user.employeeId,
                    managerName: user.managerName,
                };
            },
        }),
    ],

    callbacks: {
        // Google login - check if email exists in DB
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                if (!dbUser) {
                    throw new Error("Access denied. Your email is not registered.");
                }
                return true;
            }
            return true;
        },

        // Add user details to JWT token
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider === "google") {
                    const dbUser = await prisma.user.findUnique({
                        where: { email: token.email! },
                    });
                    token.role = dbUser?.role;
                    token.employeeId = dbUser?.employeeId;
                    token.managerName = dbUser?.managerName;
                    token.id = dbUser?.id;
                } else {
                    token.role = (user as any).role;
                    token.employeeId = (user as any).employeeId;
                    token.managerName = (user as any).managerName;
                    token.id = user.id;
                }
            }
            return token;
        },

        // Add token data to session
        async session({ session, token }) {
            session.user.role = token.role as string;
            session.user.employeeId = token.employeeId as string;
            session.user.managerName = token.managerName as string;
            session.user.id = token.id as string;
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };