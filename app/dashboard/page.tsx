"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import PaymentTable from "../components/PaymentTable";
import { FilterState } from "@/types/types";
import { useMetaOptions, usePayments } from "@/hook/useTransactionFilter";
import { FilterBar } from "../components/FilterBar";

const DashboardPage: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    searchType: "name",
    rm_name: "",
    manager: "",
    course_type: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    search: "",
    searchType: "name",
    rm_name: "",
    manager: "",
    course_type: "",
  });

  const { rmNames, managers, courseTypes, loading: metaLoading } = useMetaOptions();
  const { data, loading: dataLoading } = usePayments(appliedFilters);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <FilterBar
        onFilterChange={setFilters}
        onApply={() => setAppliedFilters(filters)}
        onClear={() => {
          const reset: FilterState = {
            search: "",
            searchType: "name",
            rm_name: "",
            manager: "",
            course_type: "",
          };
          setFilters(reset);
          setAppliedFilters(reset);
        }}
        rmNames={rmNames}
        managerNames={managers}
        courseTypes={courseTypes}
        metaLoading={metaLoading}
      />
      <main className="p-8">
        <PaymentTable data={data} loading={dataLoading} filters={filters} />
      </main>
    </div>
  );
};

export default DashboardPage;