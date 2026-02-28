"use client";
import { FC, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";

const DashboardPage: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <main className="p-8">
        <pre className="json-box">{JSON.stringify(session, null, 2)}</pre>
      </main>
    </div>
  );
};

export default DashboardPage;