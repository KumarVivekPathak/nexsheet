export type FilterState = {
    search: string;
    searchType: "order_id" | "email" | "name" | "phone";
    rm_name: string;
    manager: string;
    course_type: string;
    date_from?: Date;
    date_to?: Date;
};

export type FilterBarProps = {
    onFilterChange: (filters: FilterState) => void;
    onApply: () => void;
    onClear: () => void;
    rmNames: FilterOptionItems[];
    managerNames: FilterOptionItems[];
    courseTypes: FilterOptionItems[];
    metaLoading: boolean;
};

export type PaymentTableProps = {
    data: any[];
    loading: boolean;
    filters?: FilterState;
};

export type FilterOptionItems = {
    id: number;
    empName?: string;
    course_type?: string;
};

export type users = {
    id: number;
    employeeId: string;
    empName: string;
    empEmail: string;
    role: string;
    managerName: string | null;
    managerEmail: string | null;
    createdAt: Date;
}
