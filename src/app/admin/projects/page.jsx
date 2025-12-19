"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ image: "", name: "", description: "" });

  async function load() {
    const res = await fetch("/api/projects");
    setProjects(await res.json());
  }

  async function submit() {
    await adminFetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ image: "", name: "", description: "" });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-xl mb-4">Projects</h1>

      <input placeholder="Image URL" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, image: e.target.value })} />

      <input placeholder="Name" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <textarea placeholder="Description" className="border p-2 block mb-2"
        onChange={e => setForm({ ...form, description: e.target.value })} />

      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Add Project
      </button>

      <ul className="mt-6 space-y-2">
        {projects.map(p => <li key={p._id}>{p.name}</li>)}
      </ul>
    </div>
  );
}
