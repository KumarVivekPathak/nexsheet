"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

const RM_NAMES = [
    "Rahul Sharma",
    "Priya Singh",
    "Amit Kumar",
    "Neha Gupta",
    "Vikram Patel",
];

const MANAGER_NAMES = ["Rajesh Verma", "Sunita Mehta", "Arun Joshi"];
const COURSE_TYPES = ["Online", "Offline", "Hybrid", "Self-Paced"];
const STATUS_OPTIONS = ["captured", "failed", "refunded", "pending"];

export type FilterState = {
    search: string;
    searchType: "order_id" | "email" | "name" | "phone";
    rm_name: string;
    manager: string;
    course_type: string;
    status: string;
};

type FilterBarProps = {
    onFilterChange: (filters: FilterState) => void;
};

export default function FilterBar({ onFilterChange }: FilterBarProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        searchType: "name",
        rm_name: "",
        manager: "",
        course_type: "",
        status: "",
    });

    const handleChange = (key: keyof FilterState, value: string) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const clearFilters = () => {
        const reset: FilterState = {
            search: "",
            searchType: "name",
            rm_name: "",
            manager: "",
            course_type: "",
            status: "",
        };
        setFilters(reset);
        onFilterChange(reset);
    };

    const hasActiveFilters =
        filters.search ||
        filters.rm_name ||
        filters.manager ||
        filters.course_type ||
        filters.status;

    return (
        <div
            className="sticky z-[90] px-6 py-3 flex flex-wrap gap-3 items-center"
            style={{
                top: "64px",
                background: "rgba(10, 14, 26, 0.95)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                backdropFilter: "blur(20px)",
            }}
        >
            {/* Search Type + Input */}
            <div className="flex items-center flex-1 min-w-[280px] max-w-[420px]">
                {/* Search Type Dropdown */}
                <select
                    value={filters.searchType}
                    onChange={(e) => handleChange("searchType", e.target.value)}
                    className="h-[38px] w-[120px] rounded-l-[12px] rounded-r-none px-3 text-[0.8rem] outline-none cursor-pointer transition-all"
                    style={{
                        background: "rgba(212, 175, 55, 0.08)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        borderRight: "none",
                        color: "rgba(212, 175, 55, 0.9)",
                        fontFamily: "var(--font-poppins), sans-serif",
                        colorScheme: "dark",
                    }}
                >
                    <option value="name" style={{ background: "#0d1b2e" }}>Name</option>
                    <option value="email" style={{ background: "#0d1b2e" }}>Email</option>
                    <option value="phone" style={{ background: "#0d1b2e" }}>Phone</option>
                    <option value="order_id" style={{ background: "#0d1b2e" }}>Order ID</option>
                </select>

                {/* Search Input */}
                <div className="relative flex-1">
                    <Search
                        size={14}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(212, 175, 55, 0.5)" }}
                    />
                    <input
                        placeholder={`Search by ${filters.searchType.replace("_", " ")}...`}
                        value={filters.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                        onFocus={(e) =>
                            (e.target.style.borderColor = "rgba(212, 175, 55, 0.6)")
                        }
                        onBlur={(e) =>
                            (e.target.style.borderColor = "rgba(212, 175, 55, 0.2)")
                        }
                        className="w-full h-[38px] pl-8 pr-3 text-[0.85rem] rounded-r-[12px] rounded-l-none outline-none transition-all"
                        style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(212, 175, 55, 0.2)",
                            color: "#ffffff",
                            caretColor: "#d4af37",
                            fontFamily: "var(--font-poppins), sans-serif",
                            colorScheme: "dark",
                        }}
                    />
                </div>
            </div>

            {/* RM Name */}
            <FilterSelect
                placeholder="RM Name"
                value={filters.rm_name}
                options={RM_NAMES}
                onChange={(val) => handleChange("rm_name", val)}
            />

            {/* Manager */}
            <FilterSelect
                placeholder="Manager"
                value={filters.manager}
                options={MANAGER_NAMES}
                onChange={(val) => handleChange("manager", val)}
            />

            {/* Course Type */}
            <FilterSelect
                placeholder="Course Type"
                value={filters.course_type}
                options={COURSE_TYPES}
                onChange={(val) => handleChange("course_type", val)}
            />

            {/* Status */}
            <FilterSelect
                placeholder="Status"
                value={filters.status}
                options={STATUS_OPTIONS}
                onChange={(val) => handleChange("status", val)}
                capitalize
            />

            {/* Clear Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(220, 38, 38, 0.15)";
                        e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(220, 38, 38, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.2)";
                    }}
                    className="flex items-center gap-1.5 h-[38px] px-4 rounded-[10px] text-[0.8rem] font-medium cursor-pointer transition-all"
                    style={{
                        background: "rgba(220, 38, 38, 0.08)",
                        border: "1px solid rgba(220, 38, 38, 0.2)",
                        color: "#fca5a5",
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}
                >
                    <X size={13} />
                    Clear
                </button>
            )}
        </div>
    );
}

// Reusable Filter Select
function FilterSelect({
    placeholder,
    value,
    options,
    onChange,
    capitalize = false,
}: {
    placeholder: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
    capitalize?: boolean;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-[38px] min-w-[145px] px-3 rounded-[10px] text-[0.82rem] outline-none cursor-pointer transition-all"
            style={{
                background: value
                    ? "rgba(212, 175, 55, 0.12)"
                    : "rgba(255, 255, 255, 0.05)",
                border: value
                    ? "1px solid rgba(212, 175, 55, 0.4)"
                    : "1px solid rgba(212, 175, 55, 0.2)",
                color: value ? "#d4af37" : "rgba(255, 255, 255, 0.4)",
                fontFamily: "var(--font-poppins), sans-serif",
                colorScheme: "dark",
            }}
        >
            <option value="" style={{ background: "#0d1b2e", color: "#fff" }}>
                {placeholder}
            </option>
            {options.map((opt) => (
                <option
                    key={opt}
                    value={opt}
                    style={{ background: "#0d1b2e", color: "#fff" }}
                >
                    {capitalize ? opt.charAt(0).toUpperCase() + opt.slice(1) : opt}
                </option>
            ))}
        </select>
    );
}