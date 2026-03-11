export type FilterState = {
    search: string;
    searchType: "order_id" | "email" | "name" | "phone";
    rm_name: string;
    manager: string;
    course_type: string;
    date_from?: Date
    date_to?: Date
};

export type FilterBarProps = {
    onFilterChange: (filters: FilterState) => void;
};

export type PaymentTableProps = {
    filters: FilterState | null;
};
