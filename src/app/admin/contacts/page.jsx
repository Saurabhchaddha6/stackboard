"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  async function load() {
    const res = await adminFetch("/api/contact");
    setContacts(await res.json());
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Submissions</h1>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Mobile</th>
              <th className="py-2">City</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id} className="border-b last:border-0 text-center">
                <td className="py-2 font-medium">{c.fullName}</td>
                <td className="py-2 text-gray-600">{c.email}</td>
                <td className="py-2 text-gray-600">{c.mobile}</td>
                <td className="py-2 text-gray-600">{c.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
