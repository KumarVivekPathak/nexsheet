"use client";
import { FC, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
    const { data: session } = useSession();
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Dashboard", href: "/dashboard", roles: ["ADMIN", "USER", "MANAGER"] },
        { name: "Inventory", href: "/inventory", roles: ["ADMIN", "USER", "MANAGER"] },
        { name: "Users", href: "/users", roles: ["ADMIN"] },
    ];

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="logo-badge">BN</div>
                <span className="text-lg font-semibold text-gold-gradient">NexSheet</span>
            </div>

            {/* Center - add links later */}
            <div className="flex justify-end items-center gap-6">
                {navLinks.filter((link) => link.roles.includes(session?.user?.role || ""))
                    .map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-all duration-200 ${isActive ? "text-[#d4af37]" : "text-white hover:text-[#d4af37]"} `} >
                                {link.name}
                            </Link>
                        );
                    })}
            </div>

            {/* Profile */}
            <div className="relative">
                <button className="btn-profile" onClick={() => setProfileOpen(!profileOpen)}>
                    <div className="avatar">
                        {session?.user?.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--white-soft)" }}>
                        {session?.user?.employeeId || "Profile"}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(212,175,55,0.7)" strokeWidth="2.5"
                        style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                    <div className="dropdown">
                        <div className="gold-accent-bar mb-4" />

                        <div className="space-y-3 mb-4">
                            <div>
                                <span className="label-gold">Email</span>
                                <span className="text-sm text-white block" style={{ wordBreak: "break-all" }}>
                                    {session?.user?.email}
                                </span>
                            </div>
                            <div>
                                <span className="label-gold">Employee ID</span>
                                <span className="text-sm text-white block">{session?.user?.employeeId}</span>
                            </div>
                            <div>
                                <span className="label-gold">Role</span>
                                <span className="role-badge">{session?.user?.role}</span>
                            </div>
                        </div>

                        <div className="divider" />
                        <button className="btn-logout" onClick={() => signOut({ callbackUrl: "/login" })}>
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

            {profileOpen && (
                <div className="fixed inset-0 z-[-1]" onClick={() => setProfileOpen(false)} />
            )}
        </nav>
    );
};

export default Navbar;