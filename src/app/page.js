"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [newsletter, setNewsletter] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(setProjects);

    fetch("/api/clients")
      .then(res => res.json())
      .then(setClients);
  }, []);

  async function submitContact(e) {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    setContact({ fullName: "", email: "", mobile: "", city: "" });
    setMsg("Contact form submitted");
  }

  async function subscribe(e) {
    e.preventDefault();
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newsletter }),
    });
    setNewsletter("");
    setMsg("Subscribed successfully");
  }

  return (
    <div className="space-y-20 p-10">

      {/* HERO */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Our Company</h1>
        <p className="text-gray-600">
          We build high quality projects for amazing clients
        </p>
      </section>

      {/* PROJECTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p._id} className="border p-4 space-y-2">
              <img src={p.image} className="w-full h-40 object-cover" />
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <button className="text-sm underline">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Happy Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map(c => (
            <div key={c._id} className="border p-4 space-y-2">
              <img src={c.image} className="w-16 h-16 rounded-full" />
              <h3 className="font-bold">{c.name}</h3>
              <p className="text-sm">{c.designation}</p>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

        <form onSubmit={submitContact} className="grid gap-3 max-w-md">
          <input
            placeholder="Full Name"
            className="border p-2"
            value={contact.fullName}
            onChange={e => setContact({ ...contact, fullName: e.target.value })}
          />
          <input
            placeholder="Email"
            className="border p-2"
            value={contact.email}
            onChange={e => setContact({ ...contact, email: e.target.value })}
          />
          <input
            placeholder="Mobile"
            className="border p-2"
            value={contact.mobile}
            onChange={e => setContact({ ...contact, mobile: e.target.value })}
          />
          <input
            placeholder="City"
            className="border p-2"
            value={contact.city}
            onChange={e => setContact({ ...contact, city: e.target.value })}
          />
          <button className="bg-black text-white py-2">Submit</button>
        </form>
      </section>

      {/* NEWSLETTER */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Newsletter</h2>

        <form onSubmit={subscribe} className="flex gap-2 max-w-md">
          <input
            placeholder="Enter your email"
            className="border p-2 flex-1"
            value={newsletter}
            onChange={e => setNewsletter(e.target.value)}
          />
          <button className="bg-black text-white px-4">Subscribe</button>
        </form>
      </section>

      {msg && <p className="text-green-600">{msg}</p>}
    </div>
  );
}
