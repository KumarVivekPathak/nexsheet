"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            window.location.href = "/dashboard";
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        await signIn("google", { callbackUrl: "/dashboard" });
    };

    return (
        <div className={`${poppins.variable} min-h-screen flex items-center justify-center relative overflow-hidden`}
            style={{ fontFamily: "var(--font-poppins)" }}>

            {/* Background */}
            <div className="absolute inset-0" style={{
                background: "linear-gradient(135deg, #0a0e1a 0%, #0d1b2e 30%, #1a1200 60%, #0a0e1a 100%)"
            }} />

            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(212, 175, 55, 0.3) 40px,
            rgba(212, 175, 55, 0.3) 41px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(212, 175, 55, 0.15) 40px,
            rgba(212, 175, 55, 0.15) 41px
          )
        `
            }} />

            {/* Glowing orbs */}
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-20" style={{
                background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
                filter: "blur(40px)"
            }} />
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-15" style={{
                background: "radial-gradient(circle, #1a3a6e 0%, transparent 70%)",
                filter: "blur(60px)"
            }} />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4">

                {/* Top accent bar */}
                <div className="h-1 w-full rounded-t-2xl" style={{
                    background: "linear-gradient(90deg, #d4af37, #f5e17a, #d4af37)"
                }} />

                <div className="rounded-b-2xl p-8 relative" style={{
                    background: "rgba(10, 14, 26, 0.85)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    borderTop: "none",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.05) inset"
                }}>

                    {/* Logo + Title */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative" style={{
                            background: "linear-gradient(135deg, #d4af37, #f5e17a)",
                            boxShadow: "0 8px 24px rgba(212, 175, 55, 0.4)"
                        }}>
                            <span className="text-2xl font-bold text-gray-900">BN</span>
                            {/* Star shape overlay */}
                            <div className="absolute inset-0 rounded-2xl opacity-30" style={{
                                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)"
                            }} />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight" style={{
                            background: "linear-gradient(135deg, #ffffff 0%, #d4af37 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Welcome to NexSheet
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "rgba(212, 175, 55, 0.6)" }}>
                            The Batra Numerology
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{
                            background: "rgba(220, 38, 38, 0.1)",
                            border: "1px solid rgba(220, 38, 38, 0.3)",
                            color: "#fca5a5"
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: "rgba(212, 175, 55, 0.7)" }}>
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@thebatraanumerology.com"
                                    required
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)",
                                        color: "#ffffff",
                                        caretColor: "#d4af37",
                                    }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(212, 175, 55, 0.6)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(212, 175, 55, 0.2)"}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: "rgba(212, 175, 55, 0.7)" }}>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)",
                                        color: "#ffffff",
                                        caretColor: "#d4af37",
                                    }}
                                    onFocus={(e) => e.target.style.border = "1px solid rgba(212, 175, 55, 0.6)"}
                                    onBlur={(e) => e.target.style.border = "1px solid rgba(212, 175, 55, 0.2)"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                                    style={{ color: "rgba(212, 175, 55, 0.5)" }}
                                >
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 mt-2"
                            style={{
                                background: loading
                                    ? "rgba(212, 175, 55, 0.4)"
                                    : "linear-gradient(135deg, #d4af37, #f5e17a)",
                                color: "#0a0e1a",
                                boxShadow: loading ? "none" : "0 4px 20px rgba(212, 175, 55, 0.35)",
                                cursor: loading ? "not-allowed" : "pointer"
                            }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px" style={{ background: "rgba(212, 175, 55, 0.15)" }} />
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or</span>
                        <div className="flex-1 h-px" style={{ background: "rgba(212, 175, 55, 0.15)" }} />
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-3 transition-all duration-200"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                            cursor: googleLoading ? "not-allowed" : "pointer"
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                            (e.target as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.25)";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                            (e.target as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.12)";
                        }}
                    >
                        {/* Google Icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {googleLoading ? "Redirecting..." : "Continue with Google"}
                    </button>

                    {/* Footer */}
                    <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
                        Only @thebatraanumerology.com accounts are allowed
                    </p>

                </div>
            </div>

            <style jsx global>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.2) !important;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
        </div>
    );
}