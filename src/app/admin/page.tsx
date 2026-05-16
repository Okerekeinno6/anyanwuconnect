"use client";
import { useState, useEffect, useCallback } from "react";
import {
  apiLogin, apiVerifyToken, clearToken, apiGetContent, apiSaveContent,
  apiGetBlogs, apiCreateBlog, apiUpdateBlog, apiDeleteBlog,
  apiGetMessages, apiMarkMessageRead, apiDeleteMessage,
  isBackendConfigured, type ApiBlogPost, type ContactMessage,
} from "@/lib/api";
import {
  getSiteContent, saveSiteContent, resetSiteContent,
  defaultContent, type SiteContent,
} from "@/lib/siteContent";
import styles from "./admin.module.css";

// ── Sub-components ─────────────────────────────────────────────
import ContentEditor from "./ContentEditor";
import BlogEditor from "./BlogEditor";

type Tab = "content" | "blog" | "messages";

export default function AdminPage() {
  const [authed, setAuthed]         = useState(false);
  const [loading, setLoading]       = useState(true);
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [loginErr, setLoginErr]     = useState("");
  const [activeTab, setActiveTab]   = useState<Tab>("content");
  const [toast, setToast]           = useState("");
  const [backendOk, setBackendOk]   = useState(false);

  // Messages state
  const [messages, setMessages]         = useState<ContactMessage[]>([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [content, setContent]       = useState<SiteContent>(defaultContent);

  // Blog state
  const [posts, setPosts]           = useState<ApiBlogPost[]>([]);
  const [blogsLoaded, setBlogsLoaded] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  // ── Boot: check if already logged in ─────────────────────────
  useEffect(() => {
    (async () => {
      setBackendOk(isBackendConfigured());
      if (isBackendConfigured()) {
        const ok = await apiVerifyToken();
        if (ok) { setAuthed(true); await loadContent(); }
      }
      setLoading(false);
    })();
  }, []);

  // ── Load content ─────────────────────────────────────────────
  const loadContent = useCallback(async () => {
    if (isBackendConfigured()) {
      try {
        const remote = await apiGetContent();
        if (remote && Object.keys(remote).length > 0) {
          setContent(remote as unknown as SiteContent);
          return;
        }
      } catch { /* fall through to localStorage */ }
    }
    setContent(getSiteContent());
  }, []);

  const loadBlogs = useCallback(async () => {
    if (blogsLoaded) return;
    try {
      if (isBackendConfigured()) {
        const data = await apiGetBlogs();
        setPosts(data);
      }
      setBlogsLoaded(true);
    } catch (e) {
      showToast("Could not load blog posts from server.");
    }
  }, [blogsLoaded]);

  // ── Login ─────────────────────────────────────────────────────
  async function handleLogin() {
    setLoginErr("");
    // In offline mode the username field is hidden, so only require password
    if (isBackendConfigured() && (!username || !password)) {
      setLoginErr("Enter username and password.");
      return;
    }
    if (!isBackendConfigured() && !password) {
      setLoginErr("Enter the admin password.");
      return;
    }

    if (isBackendConfigured()) {
      try {
        await apiLogin(username, password);
        setAuthed(true);
        await loadContent();
      } catch (e: unknown) {
        setLoginErr((e as Error).message || "Login failed.");
      }
    } else {
      // Offline mode — check local password
      if (password === "AnyanwuAdmin2026!") {
        setAuthed(true);
        loadContent();
      } else {
        setLoginErr("Incorrect password.");
      }
    }
  }

  // ── Save content ──────────────────────────────────────────────
  async function handleSave() {
    saveSiteContent(content);            // always save locally as cache
    if (isBackendConfigured()) {
      try {
        await apiSaveContent(content);
        showToast("✓ Saved to server!");
      } catch {
        showToast("⚠ Saved locally (server error).");
      }
    } else {
      showToast("✓ Saved locally (no backend configured).");
    }
  }

  function handleReset() {
    if (!confirm("Reset ALL content to defaults?")) return;
    resetSiteContent();
    setContent(defaultContent);
    showToast("Content reset to defaults.");
  }

  function handleLogout() {
    clearToken();
    setAuthed(false);
  }

  // ── Tab switch ────────────────────────────────────────────────
  function switchTab(tab: Tab) {
    setActiveTab(tab);
    if (tab === "blog") loadBlogs();
    if (tab === "messages") loadMessages();
  }

  const loadMessages = useCallback(async () => {
    if (messagesLoaded) return;
    try {
      if (isBackendConfigured()) {
        const data = await apiGetMessages();
        setMessages(data);
      }
      setMessagesLoaded(true);
    } catch {
      showToast("Could not load messages from server.");
    }
  }, [messagesLoaded]);

  async function handleMarkRead(id: number) {
    try {
      await apiMarkMessageRead(id);
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    } catch {
      showToast("Could not mark message as read.");
    }
  }

  async function handleDeleteMessage(id: number) {
    if (!confirm("Delete this message?")) return;
    try {
      await apiDeleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast("Message deleted.");
    } catch {
      showToast("Could not delete message.");
    }
  }

  if (loading) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>🔐</div>
          <h1 className={styles.loginTitle}>Admin Panel</h1>
          <p className={styles.loginSub}>AnyanwuConnect Content Management</p>
          {!backendOk && (
            <div className={styles.offlineBanner}>
              ⚡ Offline mode — no backend URL configured. Changes saved to browser.
            </div>
          )}
          {backendOk && (
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoComplete="username"
            />
          )}
          <input
            className={styles.loginInput}
            type="password"
            placeholder={backendOk ? "Password" : "Admin password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            autoComplete="current-password"
          />
          {loginErr && <p className={styles.loginError}>{loginErr}</p>}
          <button className={styles.loginBtn} onClick={handleLogin}>
            Access Dashboard →
          </button>
          <p className={styles.loginNote}>
            Access this page at <strong>/admin</strong> — not linked publicly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminWrap}>
      {/* Toast */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Topbar */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.topbarLogo}>AnyanwuConnect</span>
          <span className={styles.topbarTag}>Admin</span>
          {backendOk
            ? <span className={styles.statusDot} title="Connected to backend">🟢 Live</span>
            : <span className={styles.statusDot} title="Offline mode">🟡 Local</span>
          }
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.btnReset} onClick={handleReset}>Reset Defaults</button>
          <button className={styles.btnSave} onClick={handleSave}>Save Changes</button>
          <button className={styles.btnLogout} onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "content" ? styles.tabActive : ""}`}
          onClick={() => switchTab("content")}
        >
          📝 Site Content
        </button>
        <button
          className={`${styles.tab} ${activeTab === "blog" ? styles.tabActive : ""}`}
          onClick={() => switchTab("blog")}
        >
          📰 Blog Posts
        </button>
        <button
          className={`${styles.tab} ${activeTab === "messages" ? styles.tabActive : ""}`}
          onClick={() => switchTab("messages")}
        >
          ✉️ Messages
          {messages.filter((m) => !m.read).length > 0 && (
            <span style={{
              marginLeft: "0.5rem", background: "var(--accent-emerald)",
              color: "#fff", borderRadius: "999px", padding: "0.1rem 0.5rem",
              fontSize: "0.75rem", fontWeight: 700,
            }}>
              {messages.filter((m) => !m.read).length}
            </span>
          )}
        </button>
      </div>

      {/* Body */}
      <div className={styles.adminBody}>
        {activeTab === "content" && (
          <ContentEditor content={content} setContent={setContent} onSave={handleSave} />
        )}
        {activeTab === "blog" && (
          <BlogEditor
            posts={posts}
            setPosts={setPosts}
            showToast={showToast}
            backendOk={backendOk}
          />
        )}
        {activeTab === "messages" && (
          <div style={{ maxWidth: "800px" }}>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-navy)" }}>
              Contact Messages
              {messages.filter((m) => !m.read).length > 0 && (
                <span style={{ marginLeft: "0.75rem", fontSize: "1rem", color: "var(--accent-emerald)", fontWeight: 600 }}>
                  {messages.filter((m) => !m.read).length} unread
                </span>
              )}
            </h2>
            {messages.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                No messages yet. When visitors submit the contact form, they will appear here.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {messages.map((msg) => (
                  <div key={msg.id} className="card" style={{
                    borderLeft: msg.read ? "4px solid var(--surface-border)" : "4px solid var(--accent-emerald)",
                    opacity: msg.read ? 0.8 : 1,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div>
                        <strong style={{ color: "var(--primary-navy)", fontSize: "1rem" }}>{msg.name}</strong>
                        {!msg.read && (
                          <span style={{ marginLeft: "0.5rem", background: "var(--accent-emerald)", color: "#fff", borderRadius: "999px", padding: "0.1rem 0.5rem", fontSize: "0.7rem", fontWeight: 700 }}>
                            NEW
                          </span>
                        )}
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0.2rem 0 0" }}>
                          <a href={`mailto:${msg.email}`} style={{ color: "var(--accent-emerald)" }}>{msg.email}</a>
                          {" · "}{msg.subject}{" · "}{msg.date}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkRead(msg.id)}
                            style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem", borderRadius: "0.4rem", border: "1px solid var(--accent-emerald)", background: "transparent", color: "var(--accent-emerald)", cursor: "pointer" }}
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem", borderRadius: "0.4rem", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p style={{ color: "var(--foreground)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{msg.message}</p>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--accent-emerald)", fontWeight: 600 }}
                    >
                      Reply via Email →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
