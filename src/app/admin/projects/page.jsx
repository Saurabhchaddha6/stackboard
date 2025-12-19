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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Projects</h1>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 mb-8 max-w-xl">
        <div className="mb-4 text-lg font-semibold text-gray-700">Add New Project</div>
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
            Add Project
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
        <div className="mb-4 text-lg font-semibold text-gray-700">Project List</div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2">Name</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id} className="border-b last:border-0">
                <td className="py-2 font-medium">{p.name}</td>
                <td className="py-2 text-gray-600">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
