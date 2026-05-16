"use client";

import { useState } from "react";
import { apiSubmitContact, isBackendConfigured } from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", subject: "Partnership Inquiry", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      if (isBackendConfigured()) {
        await apiSubmitContact(form);
      }
      // Always show success — even in offline mode
      setStatus("success");
      setForm({ name: "", email: "", subject: "Partnership Inquiry", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg((err as Error).message || "Something went wrong. Please try again.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--surface)", color: "var(--foreground)",
    fontSize: "0.95rem", outline: "none",
  };

  return (
    <div className="container" style={{ paddingTop: "calc(var(--nav-height) + 4rem)", paddingBottom: "4rem" }}>
      <h1 className="section-title">Contact &amp; Partner With Us</h1>
      <p className="section-subtitle">
        Reach out to AnyanwuConnect for partnerships, inquiries, or media requests.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-start" }}>

        {/* ── Form ── */}
        <div className="card">
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "var(--primary-navy)", marginBottom: "0.75rem" }}>
                Message Received!
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                Thank you for reaching out. The AnyanwuConnect team will get back to you shortly.
              </p>
              <button
                className="btn btn-secondary"
                style={{ marginTop: "1.5rem" }}
                onClick={() => setStatus("idle")}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="John Doe"
                  style={inputStyle} required
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                  Email Address <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="john@example.com"
                  style={inputStyle} required
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                  Subject
                </label>
                <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                  <option>Partnership Inquiry</option>
                  <option>Media &amp; Press</option>
                  <option>General Support</option>
                  <option>SecuraNG Access</option>
                  <option>CSCI AFRICA Programme</option>
                  <option>Donation &amp; Funding</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                  Message <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange} rows={5}
                  placeholder="How can we collaborate?"
                  style={inputStyle} required
                />
              </div>

              {errorMsg && (
                <p style={{ color: "red", fontSize: "0.9rem", margin: 0 }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>

        {/* ── Contact Info ── */}
        <div>
          <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-navy)" }}>Headquarters</h2>
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Abuja Office</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
              AnyanwuConnect Development Hub<br />
              Federal Capital Territory,<br />
              Abuja, Nigeria
            </p>
          </div>

          <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-navy)" }}>Direct Contact</h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0 }}>
            <li style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "1.5rem" }}>✉️</span>
              <div>
                <p style={{ fontWeight: 500 }}>Email</p>
                <a href="mailto:info@anyanwuconnect.com" style={{ color: "var(--accent-emerald)" }}>
                  info@anyanwuconnect.com
                </a>
              </div>
            </li>
            <li style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "1.5rem" }}>📞</span>
              <div>
                <p style={{ fontWeight: 500 }}>Phone</p>
                <p style={{ color: "var(--text-muted)" }}>Available upon request</p>
              </div>
            </li>
            <li style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "1.5rem" }}>🌍</span>
              <div>
                <p style={{ fontWeight: 500 }}>Programmes</p>
                <a href="https://llworldwide.org" target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--accent-emerald)" }}>
                  llworldwide.org
                </a>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
