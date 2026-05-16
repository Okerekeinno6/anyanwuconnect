"use client";

import { useState, useEffect } from "react";
import { apiSubmitContact, isBackendConfigured } from "@/lib/api";
import { getSiteContent, defaultContent } from "@/lib/siteContent";
import styles from "./contact.module.css";

export default function Contact() {
  const [content, setContent] = useState(defaultContent.contact);

  useEffect(() => {
    setContent(getSiteContent().contact);
  }, []);
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
      setStatus("success");
      setForm({ name: "", email: "", subject: "Partnership Inquiry", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg((err as Error).message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className={styles.contactPage}>
      <div className="container">
        <h1 className="section-title" style={{ whiteSpace: "pre-wrap" }}>{content.hero.title}</h1>
        <p className="section-subtitle" style={{ whiteSpace: "pre-wrap" }}>
          {content.hero.subtitle}
        </p>

        <div className={styles.contactGrid}>

          {/* ── Form ── */}
          <div className="card">
            {status === "success" ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✅</div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. The AnyanwuConnect team will get back to you shortly.</p>
                <button className="btn btn-secondary" onClick={() => setStatus("idle")}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formField}>
                  <label>Full Name <span className={styles.required}>*</span></label>
                  <input type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className={styles.formField}>
                  <label>Email Address <span className={styles.required}>*</span></label>
                  <input type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="john@example.com" required />
                </div>
                <div className={styles.formField}>
                  <label>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange}>
                    <option>Partnership Inquiry</option>
                    <option>Media &amp; Press</option>
                    <option>General Support</option>
                    <option>SecuraNG Access</option>
                    <option>CSCI AFRICA Programme</option>
                    <option>Donation &amp; Funding</option>
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Message <span className={styles.required}>*</span></label>
                  <textarea name="message" value={form.message}
                    onChange={handleChange} rows={5}
                    placeholder="How can we collaborate?" required />
                </div>
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <button type="submit" className="btn btn-primary"
                  style={{ width: "100%" }} disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Info ── */}
          <div className={styles.contactInfo}>
            <h2>Headquarters</h2>
            <div className="card" style={{ marginBottom: "2rem" }}>
              <h3>{content.info.hqTitle}</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{content.info.hqAddress}</p>
            </div>
            <h2>Direct Contact</h2>
            <ul className={styles.contactList}>
              <li>
                <span>✉️</span>
                <div>
                  <p>{content.info.emailLabel}</p>
                  <a href={`mailto:${content.info.emailAddress}`}>{content.info.emailAddress}</a>
                </div>
              </li>
              <li>
                <span>📞</span>
                <div>
                  <p>{content.info.phoneLabel}</p>
                  <p className={styles.muted}>{content.info.phoneNumber}</p>
                </div>
              </li>
              <li>
                <span>🌍</span>
                <div>
                  <p>{content.info.programmesLabel}</p>
                  <a href={content.info.programmesLink} target="_blank" rel="noopener noreferrer">
                    {content.info.programmesText}
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
