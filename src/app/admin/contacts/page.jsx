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
      <h1 className="text-xl mb-4">Contact Submissions</h1>

      <table className="border w-full">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id} className="border-b text-center">
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>
              <td>{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
