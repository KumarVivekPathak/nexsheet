import Navbar from "@/app/components/NavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}