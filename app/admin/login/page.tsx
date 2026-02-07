"use client";

import { useState } from "react";
import { login } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const success = await login(password);
            if (success) {
                router.push("/admin");
            } else {
                setError("Invalid Password");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="w-full max-w-md p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gradient">Admin Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00f3ff] transition-colors"
                            placeholder="Enter admin password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
