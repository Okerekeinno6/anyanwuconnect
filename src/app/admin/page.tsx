"use client";
import { useState, useEffect, useCallback } from "react";
import {
  apiLogin, apiVerifyToken, clearToken, apiGetContent, apiSaveContent,
  apiGetBlogs, apiCreateBlog, apiUpdateBlog, apiDeleteBlog,
  isBackendConfigured, type ApiBlogPost,
} from "@/lib/api";
import {
  getSiteContent, saveSiteContent, resetSiteContent,
  defaultContent, type SiteContent,
} from "@/lib/siteContent";
import styles from "./admin.module.css";

// ── Sub-components ─────────────────────────────────────────────
import ContentEditor from "./ContentEditor";
import BlogEditor from "./BlogEditor";

type Tab = "content" | "blog";

export default function AdminPage() {
  const [authed, setAuthed]         = useState(false);
  const [loading, setLoading]       = useState(true);
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [loginErr, setLoginErr]     = useState("");
  const [activeTab, setActiveTab]   = useState<Tab>("content");
  const [toast, setToast]           = useState("");
  const [backendOk, setBackendOk]   = useState(false);

  // Content state
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
    if (!username || !password) { setLoginErr("Enter username and password."); return; }

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
      </div>
    </div>
  );
}
