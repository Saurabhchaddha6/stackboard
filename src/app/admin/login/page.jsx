"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.message);
      return;
    }
    localStorage.setItem("token", data.token);
    router.push("/admin/projects");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-100 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 mt-4 tracking-tight">Stackboard Admin</h1>
        <p className="text-gray-500 mb-6 text-center">Sign in to your admin dashboard</p>
        <form onSubmit={handleLogin} className="w-full space-y-5 mt-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="admin@example.com"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            className="w-full py-2 rounded-md bg-gray-800 text-white font-semibold shadow-sm hover:bg-gray-700 transition disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="mt-8 text-xs text-gray-400 text-center">© {new Date().getFullYear()} Stackboard. All rights reserved.</div>
      </div>
    </div>
  );
}
