import { FilterOptionItems, FilterState } from "@/types/types";
import { useState, useEffect } from "react";

export const useMetaOptions = () => {
    const [rmNames, setRmNames] = useState<FilterOptionItems[]>([]);
    const [managers, setManagers] = useState<FilterOptionItems[]>([]);
    const [courseTypes, setCourseTypes] = useState<FilterOptionItems[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/meta/rms").then((r) => r.json()),
            fetch("/api/meta/managers").then((r) => r.json()),
            fetch("/api/meta/course-type").then((r) => r.json()),
        ]).then(([rms, mgrs, courses]) => {
            setRmNames(rms);
            setManagers(mgrs);
            setCourseTypes(courses);
            setLoading(false);
        });
    }, []);

    return { rmNames, managers, courseTypes, loading };
}

export const usePayments = (filters: FilterState) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();

        if (filters.search) params.set("search", filters.search);
        if (filters.searchType) params.set("searchType", filters.searchType);
        if (filters.rm_name) params.set("rm_name", filters.rm_name);
        if (filters.manager) params.set("manager", filters.manager);
        if (filters.course_type) params.set("course_type", filters.course_type);

        const controller = new AbortController();

        async function loadData() {
            try {
                setLoading(true);

                const res = await fetch(`/api/transactions?${params.toString()}`, { signal: controller.signal });
                const json = await res.json();
                setData(json);
            } catch (err) {
                if ((err as any).name !== "AbortError") {
                    console.error("Failed to load payments:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        loadData();

        return () => controller.abort();
    }, [filters]);

    console.log("datass ikjvnjkfndskjfndskjf: \n\n\n\n ", data)
    return { data, loading };
}


export const useTransactions = (filters: FilterState) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const params = new URLSearchParams();

        if (filters.search) params.set("search", filters.search);
        if (filters.searchType) params.set("searchType", filters.searchType);
        if (filters.rm_name) params.set("rm_name", filters.rm_name);
        if (filters.manager) params.set("manager", filters.manager);
        if (filters.course_type) params.set("course_type", filters.course_type);

        const controller = new AbortController();

        async function loadData() {
            try {
                setLoading(true);

                const res = await fetch(
                    `/api/transactions?${params.toString()}`,
                    { signal: controller.signal }
                );

                const json = await res.json();
                setData(json);

            } catch (err) {
                if ((err as any).name !== "AbortError") {
                    console.error("Failed to load transactions:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        loadData();

        return () => controller.abort();

    }, [filters]);

    return { data, loading };
}