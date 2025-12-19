"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);

  async function load() {
    const res = await adminFetch("/api/subscribe");
    setSubs(await res.json());
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-xl mb-4">Newsletter Subscriptions</h1>

      <ul className="space-y-2">
        {subs.map(s => (
          <li key={s._id} className="border p-2">
            {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
