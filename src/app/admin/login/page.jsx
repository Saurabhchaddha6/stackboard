"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    router.push("/admin/projects");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <h1 className="text-xl font-bold">Admin Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-black text-white w-full py-2">
          Login
        </button>
      </form>
    </div>
  );
}
