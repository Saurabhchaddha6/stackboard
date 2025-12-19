"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    image: "",
    name: "",
    designation: "",
    description: ""
  });

  async function load() {
    const res = await fetch("/api/clients");
    setClients(await res.json());
  }

  async function submit() {
    await adminFetch("/api/clients", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ image: "", name: "", description: "", designation: "" });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Clients</h1>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 mb-8 max-w-xl">
        <div className="mb-4 text-lg font-semibold text-gray-700">Add New Client</div>
        <div className="space-y-3">
          <input
            placeholder="Image URL"
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
            onChange={e => setForm({ ...form, image: e.target.value })}
            value={form.image}
          />
          <input
            placeholder="Name"
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
            onChange={e => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
          <input
            placeholder="Designation"
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
            onChange={e => setForm({ ...form, designation: e.target.value })}
            value={form.designation}
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
            onChange={e => setForm({ ...form, description: e.target.value })}
            value={form.description}
          />
          <button
            onClick={submit}
            className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition w-full"
          >
            Add Client
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
        <div className="mb-4 text-lg font-semibold text-gray-700">Client List</div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2">Name</th>
              <th className="py-2">Designation</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c._id} className="border-b last:border-0">
                <td className="py-2 font-medium">{c.name}</td>
                <td className="py-2 text-gray-600">{c.designation}</td>
                <td className="py-2 text-gray-600">{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
