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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* HERO */}
      <section className="max-w-4xl mx-auto text-center py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">Empowering Your Business</h1>
        <p className="text-xl text-gray-600 mb-8">We deliver high quality projects for ambitious clients. Let’s build something great together.</p>
        <a href="#contact" className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-gray-700 transition">Get in Touch</a>
      </section>

      {/* PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map(p => (
            <div key={p._id} className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition">
              <img src={p.image} className="w-full h-44 object-cover rounded-lg mb-2" />
              <h3 className="font-semibold text-lg text-gray-700">{p.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-3">{p.description}</p>
              <button className="text-xs text-gray-600 underline self-start mt-2">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Happy Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {clients.map(c => (
            <div key={c._id} className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex flex-col gap-2 items-center hover:shadow-lg transition">
              <img src={c.image} className="w-20 h-20 rounded-full mb-3 border-2 border-gray-200 object-cover" />
              <h3 className="font-semibold text-gray-700 text-lg">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.designation}</p>
              <p className="text-sm text-gray-500 text-center">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="max-w-2xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
        <form onSubmit={submitContact} className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 grid gap-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Full Name"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={contact.fullName}
              onChange={e => setContact({ ...contact, fullName: e.target.value })}
            />
            <input
              placeholder="Email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
            />
            <input
              placeholder="Mobile"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={contact.mobile}
              onChange={e => setContact({ ...contact, mobile: e.target.value })}
            />
            <input
              placeholder="City"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={contact.city}
              onChange={e => setContact({ ...contact, city: e.target.value })}
            />
          </div>
          <button className="bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition mt-2">Submit</button>
        </form>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Newsletter</h2>
        <form onSubmit={subscribe} className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex gap-2 max-w-md mx-auto">
          <input
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={newsletter}
            onChange={e => setNewsletter(e.target.value)}
          />
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition">Subscribe</button>
        </form>
      </section>

      {msg && <p className="text-green-600 text-center font-medium mt-8 text-lg">{msg}</p>}
    </div>
  );
}
