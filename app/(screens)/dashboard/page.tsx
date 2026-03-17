"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import PaymentTable from "../../components/PaymentTable";
import { FilterState } from "@/types/types";
import { useMetaOptions, usePayments } from "@/hook/useTransactionFilter";
import { FilterBar } from "../../components/FilterBar";
import { Pagination } from "../../components/Pagination";


const PAGE_SIZE = 100;
const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const emptyFilters: FilterState = {
    search: "", searchType: "name",
    rm_name: "", manager: "", course_type: "",
  };

  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(emptyFilters);
  const [page, setPage] = useState(1)
  const { rmNames, managers, courseTypes, loading: metaLoading } = useMetaOptions();
  const { data, total, loading: dataLoading } = usePayments(appliedFilters, page, PAGE_SIZE);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <FilterBar
        onFilterChange={setFilters}
        onApply={() => {
          setPage(1);
          setAppliedFilters(filters)
        }}
        onClear={() => {
          setPage(1);
          setFilters(emptyFilters);
          setAppliedFilters(emptyFilters);
        }}
        rmNames={rmNames}
        managerNames={managers}
        courseTypes={courseTypes}
        metaLoading={metaLoading}
      />
      <main className="p-8">
        < PaymentTable
          data={data}
          loading={dataLoading}
          filters={filters}
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
        />
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={setPage}
        />
      </main >
    </div >
  );
};

export default DashboardPage;