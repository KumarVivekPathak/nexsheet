"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data based on your schema
const SAMPLE_DATA = [
    {
        id: 1,
        order_id: "ORD-2024-001",
        created_at: "2024-01-15T10:30:00",
        customer_id: "CUST001",
        name: "Arjun Mehta",
        email: "arjun.mehta@gmail.com",
        course_type: "Online",
        course_name: "Full Stack Development",
        amount: 24999.0,
        contact: "+91 9876543210",
        phone: "+91 9876543210",
        offer: "EARLY20",
        assignee_email: "rahul.sharma@company.com",
        assigned_rm: "Rahul Sharma",
        manager: "Rajesh Verma",
        city: "Mumbai",
        pain_area: "Career Switch",
        salary: "4-6 LPA",
        status: "captured",
        currency: "INR",
        method: "UPI",
        refund_status: null,
        source_channel: "Web",
    },
    {
        id: 2,
        order_id: "ORD-2024-002",
        created_at: "2024-01-16T14:15:00",
        customer_id: "CUST002",
        name: "Priya Sharma",
        email: "priya.sharma@gmail.com",
        course_type: "Hybrid",
        course_name: "Data Science Bootcamp",
        amount: 34999.0,
        contact: "+91 9876543211",
        phone: "+91 9876543211",
        offer: null,
        assignee_email: "priya.singh@company.com",
        assigned_rm: "Priya Singh",
        manager: "Sunita Mehta",
        city: "Bangalore",
        pain_area: "Skill Upgrade",
        salary: "8-12 LPA",
        status: "captured",
        currency: "INR",
        method: "Card",
        refund_status: null,
        source_channel: "App",
    },
    {
        id: 3,
        order_id: "ORD-2024-003",
        created_at: "2024-01-17T09:00:00",
        customer_id: "CUST003",
        name: "Rohit Kumar",
        email: "rohit.kumar@gmail.com",
        course_type: "Self-Paced",
        course_name: "Python for Beginners",
        amount: 9999.0,
        contact: "+91 9876543212",
        phone: "+91 9876543212",
        offer: "FLAT10",
        assignee_email: "amit.kumar@company.com",
        assigned_rm: "Amit Kumar",
        manager: "Arun Joshi",
        city: "Delhi",
        pain_area: "Job Placement",
        salary: "2-4 LPA",
        status: "failed",
        currency: "INR",
        method: "NetBanking",
        refund_status: null,
        source_channel: "Web",
    },
    {
        id: 4,
        order_id: "ORD-2024-004",
        created_at: "2024-01-18T16:45:00",
        customer_id: "CUST004",
        name: "Sneha Patel",
        email: "sneha.patel@gmail.com",
        course_type: "Online",
        course_name: "UI/UX Design Masterclass",
        amount: 19999.0,
        contact: "+91 9876543213",
        phone: "+91 9876543213",
        offer: "DESIGN15",
        assignee_email: "neha.gupta@company.com",
        assigned_rm: "Neha Gupta",
        manager: "Rajesh Verma",
        city: "Pune",
        pain_area: "Freelancing",
        salary: "6-8 LPA",
        status: "refunded",
        currency: "INR",
        method: "UPI",
        refund_status: "full",
        source_channel: "Referral",
    },
    {
        id: 5,
        order_id: "ORD-2024-005",
        created_at: "2024-01-19T11:20:00",
        customer_id: "CUST005",
        name: "Vikram Singh",
        email: "vikram.singh@gmail.com",
        course_type: "Offline",
        course_name: "Digital Marketing Pro",
        amount: 14999.0,
        contact: "+91 9876543214",
        phone: "+91 9876543214",
        offer: null,
        assignee_email: "vikram.patel@company.com",
        assigned_rm: "Vikram Patel",
        manager: "Sunita Mehta",
        city: "Hyderabad",
        pain_area: "Business Growth",
        salary: "10+ LPA",
        status: "pending",
        currency: "INR",
        method: "Wallet",
        refund_status: null,
        source_channel: "Web",
    },
];

// Status badge styling
function StatusBadge({ status }: { status: string | null }) {
    if (!status) return <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>;

    const config: Record<string, { bg: string; border: string; color: string; label: string }> = {
        captured: {
            bg: "rgba(34, 197, 94, 0.1)",
            border: "rgba(34, 197, 94, 0.3)",
            color: "#86efac",
            label: "Captured",
        },
        failed: {
            bg: "rgba(220, 38, 38, 0.1)",
            border: "rgba(220, 38, 38, 0.3)",
            color: "#fca5a5",
            label: "Failed",
        },
        refunded: {
            bg: "rgba(99, 102, 241, 0.1)",
            border: "rgba(99, 102, 241, 0.3)",
            color: "#a5b4fc",
            label: "Refunded",
        },
        pending: {
            bg: "rgba(212, 175, 55, 0.1)",
            border: "rgba(212, 175, 55, 0.3)",
            color: "#d4af37",
            label: "Pending",
        },
    };

    const s = config[status.toLowerCase()] ?? {
        bg: "rgba(255,255,255,0.05)",
        border: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)",
        label: status,
    };

    return (
        <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.72rem] font-medium capitalize"
            style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                color: s.color,
            }}
        >
            {s.label}
        </span>
    );
}

// Method badge
function MethodBadge({ method }: { method: string | null }) {
    if (!method) return <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>;
    return (
        <span
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[0.72rem] font-medium"
            style={{
                background: "rgba(212, 175, 55, 0.08)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                color: "rgba(212, 175, 55, 0.8)",
            }}
        >
            {method}
        </span>
    );
}

const PaymentTable: React.FC = () => {
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div
            className="mx-6 my-5 rounded-2xl overflow-hidden"
            style={{
                border: "1px solid rgba(212, 175, 55, 0.2)",
                background: "rgba(10, 14, 26, 0.85)",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            }}
        >
            {/* Table Header */}
            <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.15)" }}
            >
                <div>
                    <h2
                        className="text-[1rem] font-semibold"
                        style={{ color: "#ffffff" }}
                    >
                        Payment Records
                    </h2>
                    <p className="text-[0.75rem] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {SAMPLE_DATA.length} entries found
                    </p>
                </div>
                {/* Gold accent bar */}
                <div
                    className="h-[3px] w-16 rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #d4af37, #f5e17a, #d4af37)",
                    }}
                />
            </div>

            {/* Scrollable Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    {/* Head */}
                    <thead>
                        <tr style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.15)" }}>
                            {[
                                "#",
                                "Order ID",
                                "Date",
                                "Name",
                                "Email",
                                "Course",
                                "Amount",
                                "RM",
                                "Manager",
                                "City",
                                "Method",
                                "Status",
                            ].map((col) => (
                                <th
                                    key={col}
                                    className="text-left px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-widest whitespace-nowrap"
                                    style={{ color: "rgba(212, 175, 55, 0.7)" }}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {SAMPLE_DATA.map((row, index) => (
                            <tr
                                key={row.id}
                                className="transition-all duration-150 cursor-pointer group"
                                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = "rgba(212, 175, 55, 0.04)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background = "transparent")
                                }
                            >
                                {/* # */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] font-mono"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    {index + 1}
                                </td>

                                {/* Order ID */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] font-mono font-medium whitespace-nowrap"
                                    style={{ color: "rgba(212, 175, 55, 0.8)" }}
                                >
                                    {row.order_id}
                                </td>

                                {/* Date */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {formatDate(row.created_at)}
                                </td>

                                {/* Name */}
                                <td
                                    className="px-4 py-3 text-[0.82rem] font-medium whitespace-nowrap"
                                    style={{ color: "#ffffff" }}
                                >
                                    {row.name}
                                </td>

                                {/* Email */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {row.email}
                                </td>

                                {/* Course */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div
                                        className="text-[0.8rem] font-medium"
                                        style={{ color: "rgba(255,255,255,0.85)" }}
                                    >
                                        {row.course_name}
                                    </div>
                                    <div
                                        className="text-[0.7rem] mt-0.5"
                                        style={{ color: "rgba(255,255,255,0.35)" }}
                                    >
                                        {row.course_type}
                                    </div>
                                </td>

                                {/* Amount */}
                                <td
                                    className="px-4 py-3 text-[0.82rem] font-semibold whitespace-nowrap"
                                    style={{ color: "#d4af37" }}
                                >
                                    {formatAmount(row.amount)}
                                </td>

                                {/* RM */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    {row.assigned_rm}
                                </td>

                                {/* Manager */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    {row.manager}
                                </td>

                                {/* City */}
                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {row.city}
                                </td>

                                {/* Method */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <MethodBadge method={row.method} />
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <StatusBadge status={row.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderTop: "1px solid rgba(212, 175, 55, 0.15)" }}
            >
                <p className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Showing 1 – {SAMPLE_DATA.length} of {SAMPLE_DATA.length} records
                </p>
                <p className="text-[0.72rem]" style={{ color: "rgba(212, 175, 55, 0.4)" }}>
                    NexSheet • Internal Use Only
                </p>
            </div>
        </div>
    );
}

export default PaymentTable;