"use client";
import { useState, FC } from "react";
import { signIn } from "next-auth/react";

const LoginPage: FC = () => {
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
        const res = await signIn("credentials", { email, password, redirect: false });
        if (res?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            window.location.href = "/dashboard";
        }
    };

    return (
        <div className="bg-app flex items-center justify-center relative overflow-hidden">

            {/* Pattern */}
            <div className="absolute inset-0 bg-pattern" />

            {/* Orbs */}
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #1a3a6e 0%, transparent 70%)", filter: "blur(60px)" }} />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="gold-accent-bar rounded-t-2xl" />
                <div className="card rounded-t-none p-8">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="logo-badge-lg mb-4">
                            <span>BN</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-gold-gradient">
                            Welcome to NexSheet
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "var(--gold-muted)" }}>
                            The Batra Numerology
                        </p>
                    </div>

                    {error && <div className="error-box">{error}</div>}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="label-gold">Email Address</label>
                            <input
                                type="email"
                                className="input-gold"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@thebatraanumerology.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="label-gold">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input-gold pr-16"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                                    style={{ color: "var(--gold-muted)" }}
                                >
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-gold" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 divider" />
                        <span className="text-xs" style={{ color: "var(--white-muted)" }}>or</span>
                        <div className="flex-1 divider" />
                    </div>

                    {/* Google */}
                    <button className="btn-outline" onClick={() => { setGoogleLoading(true); signIn("google", { callbackUrl: "/dashboard" }); }} disabled={googleLoading}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {googleLoading ? "Redirecting..." : "Continue with Google"}
                    </button>

                    <p className="text-center text-xs mt-6" style={{ color: "var(--white-muted)" }}>
                        Only @thebatraanumerology.com accounts are allowed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;