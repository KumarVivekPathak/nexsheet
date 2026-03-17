import { CreateUserPayload, CreateUserState, users } from "@/types/types";
import { useEffect, useState } from "react";

export const useUsers = () => {
    const [users, setUsers] = useState<users[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return { users, loading, error };
}

export function useCreateUser() {
    const [state, setState] = useState<CreateUserState>({
        loading: false,
        error: null,
        success: false,
    });

    const createUser = async (data: CreateUserPayload) => {
        setState({ loading: true, error: null, success: false });

        try {
            const res = await fetch("/api/users/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    employee_id: data.employeeId,
                    emp_name: data.name,
                    emp_email: data.email,
                    password: data.password,
                    role: data.role.toUpperCase(),
                    manager_name: data.managerName || null,
                    manager_email: data.managerEmail || null,
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                setState({ loading: false, error: json.message ?? "Failed to create user", success: false });
                return { success: false, error: json.message };
            }

            setState({ loading: false, error: null, success: true });
            return { success: true, data: json };
        } catch (err: any) {
            const msg = err?.message ?? "Something went wrong";
            setState({ loading: false, error: msg, success: false });
            return { success: false, error: msg };
        }
    };

    const reset = () => setState({ loading: false, error: null, success: false });

    return { createUser, reset, ...state };
}