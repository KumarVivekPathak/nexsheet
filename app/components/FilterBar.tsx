"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { DatePickerWithRange } from "./DateRangePicker";
import { FilterState, FilterBarProps, FilterOptionItems } from "@/types/types";

export const FilterBar: React.FC<FilterBarProps> = ({
    onFilterChange,
    onApply,
    onClear,
    rmNames,
    managerNames,
    courseTypes,
    metaLoading }) => {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        searchType: "name",
        rm_name: "",
        manager: "",
        course_type: "",
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
        };
        setFilters(reset);
        onFilterChange(reset);
        onClear();
    };

    const hasActiveFilters =
        filters.search ||
        filters.rm_name ||
        filters.manager ||
        filters.course_type
    return (
        <div
            className="sticky top-16 z-[90] px-6 py-3 flex flex-wrap gap-3 items-center
            bg-[rgba(10,14,26,0.95)] border-b border-gold-dim backdrop-blur-xl"
        >
            <div className="flex items-center flex-1 min-w-[280px] max-w-[420px]">
                <select
                    value={filters.searchType}
                    onChange={(e) => handleChange("searchType", e.target.value)}
                    className="h-9 w-[120px] rounded-l-xl rounded-r-none px-3 text-sm outline-none cursor-pointer transition
                                bg-gold-faint border border-gold-dim border-r-0
                                text-[rgba(212,175,55,0.9)] font-poppins"
                >
                    <option value="name" className="bg-bg-secondary">Name</option>
                    <option value="email" className="bg-bg-secondary">Email</option>
                    <option value="contact" className="bg-bg-secondary">Contact</option>
                    <option value="order_id" className="bg-bg-secondary">Order ID</option>
                    <option value="offer" className="bg-bg-secondary">Offer</option>
                </select>

                <div className="relative flex-1">
                    <Search
                        size={14}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gold-muted"
                    />
                    <input
                        placeholder={`Search by ${filters.searchType.replace("_", " ")}...`}
                        value={filters.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                        className="w-full h-9 pl-8 pr-3 text-sm rounded-r-xl rounded-l-none outline-none transition
                                    bg-white-dim border border-gold-dim
                                    focus:border-[#d4af37]
                                    text-white caret-[#d4af37]
                                    font-poppins"
                    />
                </div>
            </div>

            {/* RM Name */}
            <FilterSelect
                placeholder={metaLoading ? "Loading..." : "RM Name"}
                value={filters.rm_name}
                options={rmNames}
                labelKey="empName"
                onChange={(val) => handleChange("rm_name", val)}
            />

            {/* Manager */}
            <FilterSelect
                placeholder={metaLoading ? "Loading..." : "Manager"}
                value={filters.manager}
                options={managerNames}
                labelKey="empName"
                onChange={(val) => handleChange("manager", val)}
            />

            {/* Course Type */}
            <FilterSelect
                placeholder={metaLoading ? "Loading..." : "Course Type"}
                value={filters.course_type}
                options={courseTypes}
                labelKey="course_type"
                onChange={(val) => handleChange("course_type", val)}
            />

            <div className="min-w-[210px]">
                <DatePickerWithRange
                    onChange={(range) =>
                        onFilterChange({
                            ...filters,
                            date_from: range?.from,
                            date_to: range?.to,
                        })
                    }
                />
            </div>


            <button
                onClick={onApply}
                className="flex items-center gap-1.5 h-9 px-5 rounded-lg text-sm font-semibold
                bg-gradient-to-br from-yellow-400 to-yellow-300
                hover:from-yellow-500 hover:to-yellow-400
                text-gray-900 shadow-md hover:shadow-lg
                transition font-poppins"
            >
                Apply
            </button>

            {/* Clear Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-medium
                    bg-red-500/10 hover:bg-red-500/20
                    border border-red-500/30 hover:border-red-500/50
                    text-red-300 transition font-poppins"
                >
                    <X size={13} />
                    Clear
                </button>
            )}
        </div>
    );
}

// Reusable Filter Select
const FilterSelect = ({
    placeholder,
    value,
    options,
    onChange,
    labelKey,
}: {
    placeholder: string;
    value: string;
    options: FilterOptionItems[];
    onChange: (val: string) => void;
    labelKey: "empName" | "course_type";
}) => {
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
                    key={opt.id}
                    value={opt[labelKey] || ""}
                    style={{ background: "#0d1b2e", color: "#fff" }}
                >
                    {opt[labelKey]}
                </option>
            ))}
        </select>
    );
}