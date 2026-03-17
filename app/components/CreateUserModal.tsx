"use client";
import React, { useState } from "react";
import { UserPlus, User, Mail, Hash, Users, Shield, Loader2, AlertCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/hook/useUsers";
import { CreateUserForm } from "@/types/types";


const EMPTY_FORM: CreateUserForm = {
    employeeId: "",
    name: "",
    email: "",
    password: "",
    role: "USER",
    managerId: "",
    managerName: "",
    managerEmail: "",
};

function FieldGroup({
    label,
    icon: Icon,
    children,
}: {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <Label className="text-[0.75rem] font-medium text-gold/70 uppercase tracking-widest flex items-center gap-1.5">
                <Icon size={11} className="text-gold/50" />
                {label}
            </Label>
            {children}
        </div>
    );
}

const inputClass =
    "h-[38px] text-[0.82rem] rounded-[10px] bg-white/5 border-gold/20 text-white caret-gold placeholder:text-white/20 focus:border-gold/50 focus-visible:ring-0 font-[var(--font-poppins)] transition-colors";

type Props = {
    onSuccess?: () => void;
};

export default function CreateUserModal({ onSuccess }: Props) {

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<CreateUserForm>(EMPTY_FORM);
    const { createUser, loading, error, reset } = useCreateUser();

    const set = (key: keyof CreateUserForm, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async () => {
        const result = await createUser(form);
        if (result.success) {
            setForm(EMPTY_FORM);
            setOpen(false);
            onSuccess?.();
        }
    };

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) { setForm(EMPTY_FORM); reset(); }
    };

    const isValid = form.employeeId && form.name && form.email;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button
                    className="flex items-center gap-2 h-[38px] w-full px-4 rounded-[10px] text-[0.82rem] font-medium transition-all duration-200 bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 hover:border-gold/50"
                >
                    <UserPlus size={14} />
                    Create User
                </button>
            </DialogTrigger>

            <DialogContent
                className="max-w-[520px] p-0 gap-0 overflow-hidden border-gold/20 bg-bg-primary rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
                {/* Header */}
                <div
                    className="relative px-6 pt-6 pb-5"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.12)" }}
                >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <DialogHeader>
                        <DialogTitle className="text-white text-[1.05rem] font-semibold flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center">
                                <UserPlus size={15} className="text-gold" />
                            </div>
                            Create New User
                        </DialogTitle>
                    </DialogHeader>
                </div>

                {/* Form Body */}
                <div className="px-6 py-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <FieldGroup label="Employee ID" icon={Hash}>
                            <Input
                                placeholder="TBNA-2026-001"
                                value={form.employeeId}
                                onChange={(e) => set("employeeId", e.target.value)}
                                className={inputClass}
                            />
                        </FieldGroup>

                        <FieldGroup label="Role" icon={Shield}>
                            <Select value={form.role} onValueChange={(v) => set("role", v)}>
                                <SelectTrigger className="h-[38px] text-[0.82rem] font-poppins rounded-[10px] bg-white/5 border-gold/20 text-white focus:ring-0 focus:border-gold/50 transition-colors data-[placeholder]:text-white/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-bg-primary border-gold/20 rounded-xl text-white font-poppins">
                                    {[
                                        { value: "user", label: "User", color: "text-indigo-300" },
                                        { value: "manager", label: "Manager", color: "text-emerald-300" },
                                        { value: "admin", label: "Admin", color: "text-gold" },
                                    ].map((r) => (
                                        <SelectItem
                                            key={r.value}
                                            value={r.value}
                                            className={`text-[0.82rem] focus:bg-gold/10 focus:text-white cursor-pointer ${r.color}`}
                                        >
                                            {r.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FieldGroup>
                    </div>

                    <FieldGroup label="Full Name" icon={User}>
                        <Input
                            placeholder="e.g. Rahul Sharma"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            className={inputClass}
                        />
                    </FieldGroup>

                    <FieldGroup label="Email ID" icon={Mail}>
                        <Input
                            type="email"
                            placeholder="rahul@company.com"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            className={inputClass}
                        />
                    </FieldGroup>

                    <FieldGroup label="Password" icon={Mail}>
                        <Input
                            type="password"
                            placeholder="rahul@company.com"
                            value={form.password}
                            onChange={(e) => set("password", e.target.value)}
                            className={inputClass}
                        />
                    </FieldGroup>

                    <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-gold/[0.08]" />
                        <span className="text-[0.68rem] text-white/25 uppercase tracking-widest">Manager Details</span>
                        <div className="flex-1 h-px bg-gold/[0.08]" />
                    </div>

                    <FieldGroup label="Manager Name" icon={Users}>
                        <Input
                            placeholder="e.g. Rajesh Verma"
                            value={form.managerName}
                            onChange={(e) => set("managerName", e.target.value)}
                            className={inputClass}
                        />
                    </FieldGroup>

                    <FieldGroup label="Manager Email ID" icon={Mail}>
                        <Input
                            type="email"
                            placeholder="rajesh@company.com"
                            value={form.managerEmail}
                            onChange={(e) => set("managerEmail", e.target.value)}
                            className={inputClass}
                        />
                    </FieldGroup>

                    {error && (
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] bg-red-500/10 border border-red-500/20">
                            <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
                            <p className="text-[0.78rem] text-red-400">{error}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-6 py-4 flex items-center justify-end gap-3"
                    style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
                >
                    <button
                        onClick={() => handleOpenChange(false)}
                        disabled={loading}
                        className="h-[36px] px-4 rounded-[10px] text-[0.8rem] text-white/40 hover:text-white/70 transition-colors disabled:opacity-30"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!isValid || loading}
                        className="flex items-center gap-2 h-[36px] px-5 rounded-[10px] text-[0.82rem] font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gold/15 border border-gold/35 text-gold hover:bg-gold/25 hover:border-gold/55"
                    >
                        {loading ? (
                            <><Loader2 size={13} className="animate-spin" /> Creating...</>
                        ) : (
                            <><UserPlus size={13} /> Create User</>
                        )}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}