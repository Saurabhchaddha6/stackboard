"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    image: "",
    name: "",
    description: "",
    designation: "",
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
      <h1 className="text-xl mb-4">Clients</h1>

      <input placeholder="Image URL" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, image: e.target.value })} />

      <input placeholder="Name" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Designation" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, designation: e.target.value })} />

      <textarea placeholder="Description" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, description: e.target.value })} />

      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Add Client
      </button>

      <ul className="mt-6 space-y-2">
        {clients.map(c => (
          <li key={c._id}>
            {c.name} — {c.designation}
          </li>
        ))}
      </ul>
    </div>
  );
}
