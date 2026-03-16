"use client";
import { PaginationProps } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";


export const Pagination: React.FC<PaginationProps> = ({
    page, pageSize, total, onPageChange,
}) => {
    if (total === 0) return null;

    const totalPages = Math.ceil(total / pageSize);
    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return (
        <div className="flex items-center justify-end gap-3 mt-4 font-poppins">

            {/* Label */}
            <span className="text-sm text-white/50">
                Showing{" "}
                <span className="text-gold-text font-medium">{from}–{to}</span>
                {" "}of{" "}
                <span className="text-gold-text font-medium">{total}</span>
            </span>

            {/* Prev */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrev}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition
                           border border-gold-dim text-gold-text
                           hover:bg-gold-faint
                           disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} />
            </button>

            {/* Page indicator */}
            <span className="text-sm text-white/60">
                {page} / {totalPages}
            </span>

            {/* Next */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNext}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition
                           border border-gold-dim text-gold-text
                           hover:bg-gold-faint
                           disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronRight size={16} />
            </button>

        </div>
    );
};
