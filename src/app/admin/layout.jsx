"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [pathname]);

  if (!ready) return null;

  // No sidebar on login page
  if (pathname === "/admin/login") {
    return children;
  }

  function logout() {
    localStorage.removeItem("token");
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col justify-between min-h-screen shadow-sm">
        <nav className="space-y-2">
          <div className="mb-6 text-lg font-bold text-gray-700 tracking-tight pl-1">Admin Panel</div>
          <Link href="/admin/projects" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">Projects</Link>
          <Link href="/admin/clients" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">Clients</Link>
          <Link href="/admin/contacts" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">Contacts</Link>
          <Link href="/admin/subscriptions" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">Subscriptions</Link>
        </nav>
        <button
          onClick={logout}
          className="mt-8 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition border border-gray-200"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
