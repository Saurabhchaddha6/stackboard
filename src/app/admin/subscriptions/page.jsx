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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Newsletter Subscriptions</h1>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 max-w-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {subs.map(s => (
              <tr key={s._id} className="border-b last:border-0">
                <td className="py-2 font-medium">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
