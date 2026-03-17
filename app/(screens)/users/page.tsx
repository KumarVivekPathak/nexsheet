"use client";
import { useUsers } from "@/hook/useUsers";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, User, Mail, Briefcase, Users } from "lucide-react";

const ROLE_CONFIG: Record<string, { badge: string }> = {
    admin: { badge: "bg-bg-primary border border-gold text-[#d4af37]" },
    user: { badge: "bg-indigo-500 border border-indigo-400 text-white" },
    manager: { badge: "bg-emerald-500 border border-emerald-400 text-white" },
};

function RoleBadge({ role }: { role: string }) {
    console.log(role);
    const cfg = ROLE_CONFIG[role?.toLowerCase()?.trim()] ?? {
        badge: "bg-white border border-white text-black",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wider ${cfg.badge}`}>
            {role}
        </span>
    );
}

function UserCard({ user }: { user: any }) {
    console.log("role value dkjfsdskjfgdskjghjdskg:", user.role)
    return (
        <Card className="relative overflow-hidden transition-all duration-200 cursor-default bg-bg-primary border border-gold rounded-2xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-md font-bold flex-shrink-0 bg-gold/10 border border-gold text-[#f5e17a]">
                            {user.empName
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>
                        <div>
                            <p className="text-[0.9rem] font-semibold leading-tight text-white">
                                {user.empName}
                            </p>
                            <p className="text-[0.72rem] mt-0.5 text-white/40">
                                ID: {user?.employeeId}
                            </p>
                        </div>
                    </div>
                    <RoleBadge role={user.role} />
                </div>
                <div className="mb-4 h-px bg-gold" />
                <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                        <Mail size={13} className="text-white flex-shrink-0" />
                        <span className="text-[0.78rem] truncate text-white">{user.empEmail}</span>
                    </div>

                    {user.managerName && (
                        <div className="flex items-center gap-2.5">
                            <Users size={13} className="text-white/40 flex-shrink-0" />
                            <span className="text-[0.78rem] text-white/40">{user.managerName}</span>
                        </div>
                    )}

                    {user.managerEmail && (
                        <div className="flex items-center gap-2.5">
                            <Briefcase size={13} className="text-white/40 flex-shrink-0" />
                            <span className="text-[0.78rem] truncate text-gold bg-gold/10">{user.managerEmail}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

const UsersPage: React.FC = () => {
    const { users } = useUsers();
    const [search, setSearch] = useState("");

    const filtered = users.filter((user) => {
        const q = search.toLowerCase();
        return (
            user.empName?.toLowerCase().includes(q) ||
            user.empEmail?.toLowerCase().includes(q) ||
            user.role?.toLowerCase().includes(q) ||
            user.managerName?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="px-6 py-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-[1.4rem] font-semibold text-white">Team Members</h1>
                    <p className="text-[0.8rem] mt-1 text-white">
                        {filtered.length} of {users.length} users
                    </p>
                </div>

                {/* Search */}
                <div className="relative min-w-[260px] max-w-[340px] w-full">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold" />
                    <Input
                        placeholder="Search by name, email, role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-[38px] text-md rounded-[10px] bg-bg-primary border-gold text-white caret-gold placeholder:text-white focus:border-gold focus-visible:ring-0 font-poppins"
                    />
                </div>
            </div>

            {/* Cards Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-gold text-white">
                    <User size={32} className="mb-3 opacity-30" />
                    <p className="text-xl">No users found</p>
                </div>
            )}
        </div>
    );
};

export default UsersPage;