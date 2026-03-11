"use client";
import { PaymentTableProps } from "@/types/types";

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

const PaymentTable: React.FC<PaymentTableProps> = ({ data, loading }) => {
    const filteredData = data;
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

    if (loading) {
        return (
            <div
                className="mx-6 my-5 rounded-2xl flex items-center justify-center h-[300px]"
                style={{
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    background: "rgba(10, 14, 26, 0.85)",
                }}
            >
                <div className="text-center">
                    <div
                        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
                        style={{ borderColor: "rgba(212, 175, 55, 0.6)", borderTopColor: "transparent" }}
                    />
                    <p className="text-[0.8rem]" style={{ color: "rgba(212,175,55,0.5)" }}>
                        Loading records...
                    </p>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div
                className="mx-6 my-5 rounded-2xl flex items-center justify-center h-[300px]"
                style={{
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    background: "rgba(10, 14, 26, 0.85)",
                }}
            >
                <p className="text-[0.85rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    No records found for the selected filters.
                </p>
            </div>
        );
    }

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
                        {filteredData.length} entries found
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
                                "Contact",
                                "Course",
                                "Amount",
                                "Offer",
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
                        {filteredData.map((row, index) => (
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

                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {row.contact}
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

                                <td
                                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {row.offer}
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
                    Showing 1 – {filteredData.length} of {filteredData.length} records
                </p>
                <p className="text-[0.72rem]" style={{ color: "rgba(212, 175, 55, 0.4)" }}>
                    NexSheet • Internal Use Only
                </p>
            </div>
        </div>
    );
}

export default PaymentTable;