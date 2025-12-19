"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null; // prevents flicker

  function logout() {
    localStorage.removeItem("token");
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r p-4 space-y-3">
        <Link href="/admin/projects">Projects</Link>
        <Link href="/admin/clients">Clients</Link>
        <Link href="/admin/contacts">Contacts</Link>
        <Link href="/admin/subscriptions">Subscriptions</Link>

        <button onClick={logout} className="text-red-500 block">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
