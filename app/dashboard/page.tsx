"use client";

import { FC, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";

const DashboardPage: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0e1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#d4af37",
        fontFamily: "monospace"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a" }}>
      <Navbar />
      <main style={{ padding: "2rem", fontFamily: "monospace" }}>
        <pre style={{
          background: "rgba(212,175,55,0.05)",
          border: "1px solid rgba(212,175,55,0.2)",
          borderRadius: "12px",
          padding: "1.5rem",
          color: "#ffffff",
          fontSize: "0.85rem",
          overflow: "auto"
        }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </main>
    </div>
  );
};

export default DashboardPage;