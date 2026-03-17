import Navbar from "@/app/components/NavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-bg-primary min-h-screen">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}