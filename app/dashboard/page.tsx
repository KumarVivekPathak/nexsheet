"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import FilterBar, { FilterState } from "@/app/components/FilterBar";
import PaymentTable from "../components/PaymentTable";

const DashboardPage: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <FilterBar onFilterChange={(f) => setFilters(f)} />
      <main className="p-8">
        {/* Table will go here */}
        <PaymentTable />
        <pre className="text-xs">{JSON.stringify(filters, null, 2)}</pre>
      </main>
    </div>
  );
};

export default DashboardPage;