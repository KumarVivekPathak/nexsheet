"use client";

import { FC, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

const Navbar: FC = () => {
    const { data: session } = useSession();
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav
            className={poppins.variable}
            style={{
                fontFamily: "var(--font-poppins)",
                background: "rgba(10, 14, 26, 0.95)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
                backdropFilter: "blur(20px)",
                padding: "0 2rem",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
        >
            {/* Left - Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #d4af37, #f5e17a)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                        color: "#0a0e1a",
                        boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                    }}
                >
                    BN
                </div>
                <span
                    style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        background: "linear-gradient(135deg, #ffffff, #d4af37)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: "-0.3px",
                    }}
                >
                    NexSheet
                </span>
            </div>

            {/* Center - Nav Links (add more later) */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {/* Add nav links here later */}
            </div>

            {/* Right - Profile */}
            <div style={{ position: "relative" }}>
                {/* Profile Button */}
                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        background: "rgba(212, 175, 55, 0.08)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        borderRadius: "50px",
                        padding: "0.4rem 0.9rem 0.4rem 0.4rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(212, 175, 55, 0.15)";
                        (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(212, 175, 55, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(212, 175, 55, 0.08)";
                        (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(212, 175, 55, 0.2)";
                    }}
                >
                    {/* Avatar */}
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #d4af37, #f5e17a)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                            color: "#0a0e1a",
                        }}
                    >
                        {session?.user?.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontWeight: "500" }}>
                        {session?.user?.employeeId || "Profile"}
                    </span>
                    {/* Chevron */}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(212,175,55,0.7)"
                        strokeWidth="2.5"
                        style={{
                            transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                        }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: "calc(100% + 10px)",
                            right: "0",
                            width: "260px",
                            background: "rgba(10, 14, 26, 0.98)",
                            border: "1px solid rgba(212, 175, 55, 0.2)",
                            borderRadius: "16px",
                            padding: "1rem",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        {/* Top accent */}
                        <div style={{
                            height: "2px",
                            background: "linear-gradient(90deg, #d4af37, #f5e17a, #d4af37)",
                            borderRadius: "2px",
                            marginBottom: "1rem",
                        }} />

                        {/* User Info */}
                        <div style={{ marginBottom: "1rem" }}>

                            {/* Email */}
                            <div style={{ marginBottom: "0.6rem" }}>
                                <span style={{ fontSize: "0.65rem", color: "rgba(212,175,55,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "2px" }}>
                                    Email
                                </span>
                                <span style={{ fontSize: "0.82rem", color: "#ffffff", wordBreak: "break-all" }}>
                                    {session?.user?.email}
                                </span>
                            </div>

                            {/* Employee ID */}
                            <div style={{ marginBottom: "0.6rem" }}>
                                <span style={{ fontSize: "0.65rem", color: "rgba(212,175,55,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "2px" }}>
                                    Employee ID
                                </span>
                                <span style={{ fontSize: "0.82rem", color: "#ffffff" }}>
                                    {session?.user?.employeeId}
                                </span>
                            </div>

                            {/* Role */}
                            <div>
                                <span style={{ fontSize: "0.65rem", color: "rgba(212,175,55,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "4px" }}>
                                    Role
                                </span>
                                <span style={{
                                    fontSize: "0.72rem",
                                    fontWeight: "600",
                                    padding: "2px 10px",
                                    borderRadius: "20px",
                                    background: "rgba(212,175,55,0.15)",
                                    border: "1px solid rgba(212,175,55,0.3)",
                                    color: "#d4af37",
                                    letterSpacing: "0.05em",
                                }}>
                                    {session?.user?.role}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: "1px", background: "rgba(212,175,55,0.1)", margin: "0.75rem 0" }} />

                        {/* Logout */}
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                borderRadius: "10px",
                                background: "rgba(220, 38, 38, 0.08)",
                                border: "1px solid rgba(220, 38, 38, 0.2)",
                                color: "#fca5a5",
                                fontSize: "0.82rem",
                                fontWeight: "500",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(220, 38, 38, 0.15)";
                                (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(220, 38, 38, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(220, 38, 38, 0.08)";
                                (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(220, 38, 38, 0.2)";
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Close dropdown on outside click */}
            {profileOpen && (
                <div
                    style={{ position: "fixed", inset: 0, zIndex: -1 }}
                    onClick={() => setProfileOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;