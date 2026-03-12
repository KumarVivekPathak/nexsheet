import { users } from "@/types/types";
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
                setUsers(data);
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