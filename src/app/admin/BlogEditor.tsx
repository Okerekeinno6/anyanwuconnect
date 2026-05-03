"use client";
import { useState } from "react";
import {
  apiCreateBlog, apiUpdateBlog, apiDeleteBlog, apiUploadImage, type ApiBlogPost,
} from "@/lib/api";
import styles from "./admin.module.css";
import { Field } from "./ContentEditor";

const EMPTY_POST: Partial<ApiBlogPost> = {
  title: "", excerpt: "", category: "General", content: "",
  coverImage: "", author: "The AnyanwuConnect Team",
  authorRole: "Executive Think Tank", authorAvatar: "",
  tags: [], readTime: "5 min read", published: false,
};

const CATEGORIES = [
  "General", "Leadership", "Security", "Economic Empowerment",
  "Technology & Education", "Community", "Health", "Youth",
];

export default function BlogEditor({
  posts, setPosts, showToast, backendOk,
}: {
  posts: ApiBlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<ApiBlogPost[]>>;
  showToast: (msg: string) => void;
  backendOk: boolean;
}) {
  const [editing, setEditing] = useState<Partial<ApiBlogPost> | null>(null);
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [view, setView]       = useState<"list" | "edit">("list");
  const [uploading, setUploading] = useState(false);

  function openNew() {
    setEditing({ ...EMPTY_POST });
    setView("edit");
  }

  function openEdit(post: ApiBlogPost) {
    setEditing({ ...post });
    setView("edit");
  }

  function cancelEdit() {
    setEditing(null);
    setView("list");
  }

  function setField(key: keyof ApiBlogPost, value: unknown) {
    setEditing((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  async function handleSave() {
    if (!editing?.title?.trim()) { showToast("Title is required."); return; }
    if (!backendOk) { showToast("⚠ Backend not connected — blog changes require the API."); return; }
    setSaving(true);
    try {
      if (editing.id) {
        const updated = await apiUpdateBlog(editing.id, editing);
        setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
        showToast("✓ Post updated!");
      } else {
        const created = await apiCreateBlog(editing);
        setPosts((prev) => [created, ...prev]);
        showToast("✓ Post created!");
      }
      cancelEdit();
    } catch (e: unknown) {
      showToast(`Error: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handlePublishToggle(post: ApiBlogPost) {
    if (!backendOk) { showToast("⚠ Backend not connected."); return; }
    try {
      const updated = await apiUpdateBlog(post.id, { published: !post.published });
      setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
      showToast(updated.published ? "✓ Post published!" : "Post unpublished.");
    } catch (e: unknown) {
      showToast(`Error: ${(e as Error).message}`);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this post permanently?")) return;
    if (!backendOk) { showToast("⚠ Backend not connected."); return; }
    setDeleting(id);
    try {
      await apiDeleteBlog(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Post deleted.");
    } catch (e: unknown) {
      showToast(`Error: ${(e as Error).message}`);
    } finally {
      setDeleting(null);
    }
  }

  // ── EDIT VIEW ────────────────────────────────────────────────
  if (view === "edit" && editing !== null) {
    return (
      <div className={styles.editor}>
        <div className={styles.pageBlock}>
          <div className={styles.blogEditHeader}>
            <button className={styles.backBtn} onClick={cancelEdit}>← Back to Posts</button>
            <h2 className={styles.pageBlockTitle}>
              {editing.id ? "✏️ Edit Post" : "✨ New Post"}
            </h2>
          </div>

          {!backendOk && (
            <div className={styles.warnBanner}>
              ⚠ Backend not configured — connect your API to save blog posts.
            </div>
          )}

          <div className={styles.blogForm}>
            <Field label="Title *" value={editing.title || ""}
              onChange={(v) => setField("title", v)} />

            <div className={styles.blogFormRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Category</label>
                <select className={styles.fieldInput} value={editing.category || "General"}
                  onChange={(e) => setField("category", e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <Field label="Read Time" value={editing.readTime || "5 min read"}
                onChange={(v) => setField("readTime", v)} />
            </div>

            <Field label="Excerpt (shown on listing page)" value={editing.excerpt || ""}
              onChange={(v) => setField("excerpt", v)} multiline rows={3} />

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Cover Image (Upload or URL)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (!backendOk) { showToast("⚠ API required to upload images"); return; }
                    setUploading(true);
                    try {
                      const url = await apiUploadImage(file);
                      setField("coverImage", url);
                      showToast("Image uploaded!");
                    } catch (err: any) {
                      showToast(`Upload failed: ${err.message}`);
                    } finally {
                      setUploading(false);
                      e.target.value = ''; // Reset input
                    }
                  }}
                />
                {uploading && <span style={{ alignSelf: 'center' }}>Uploading...</span>}
              </div>
              <input
                className={styles.fieldInput}
                type="text"
                placeholder="Or paste an image URL directly..."
                value={editing.coverImage || ""}
                onChange={(e) => setField("coverImage", e.target.value)}
              />
            </div>

            {editing.coverImage && (
              <img src={editing.coverImage} alt="Cover preview"
                className={styles.coverPreview}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}

            <Field label="Content (Markdown supported)" value={editing.content || ""}
              onChange={(v) => setField("content", v)} multiline rows={20} />

            <div className={styles.blogFormRow}>
              <Field label="Author Name" value={editing.author || ""}
                onChange={(v) => setField("author", v)} />
              <Field label="Author Role" value={editing.authorRole || ""}
                onChange={(v) => setField("authorRole", v)} />
            </div>

            <Field label="Author Avatar URL" value={editing.authorAvatar || ""}
              onChange={(v) => setField("authorAvatar", v)} />

            <Field label="Tags (comma separated)"
              value={Array.isArray(editing.tags) ? editing.tags.join(", ") : ""}
              onChange={(v) => setField("tags", v.split(",").map((t) => t.trim()).filter(Boolean))} />

            <div className={styles.publishRow}>
              <label className={styles.publishLabel}>
                <input type="checkbox" checked={!!editing.published}
                  onChange={(e) => setField("published", e.target.checked)}
                  className={styles.publishCheck} />
                <span>Publish immediately</span>
              </label>
              <span className={styles.publishHint}>
                Unpublished posts are only visible to you as drafts.
              </span>
            </div>

            <div className={styles.blogFormActions}>
              <button className={styles.btnReset} onClick={cancelEdit}>Cancel</button>
              <button className={styles.btnSave} onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : editing.id ? "Update Post" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ────────────────────────────────────────────────
  return (
    <div className={styles.editor}>
      <div className={styles.pageBlock}>
        <div className={styles.blogListHeader}>
          <h2 className={styles.pageBlockTitle}>📰 Blog Posts</h2>
          <button className={styles.btnSave} onClick={openNew}>+ New Post</button>
        </div>

        {!backendOk && (
          <div className={styles.warnBanner}>
            ⚠ Backend not configured. Set <code>NEXT_PUBLIC_API_URL</code> in your <code>.env.local</code> to manage blog posts.
          </div>
        )}

        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No blog posts yet.</p>
            <button className={styles.btnSave} onClick={openNew}>Create Your First Post</button>
          </div>
        ) : (
          <div className={styles.blogList}>
            {posts.map((post) => (
              <div key={post.id} className={styles.blogListItem}>
                <div className={styles.blogItemLeft}>
                  {post.coverImage && (
                    <img src={post.coverImage} alt="" className={styles.blogThumb} />
                  )}
                  <div>
                    <div className={styles.blogItemMeta}>
                      <span className={styles.blogCategory}>{post.category}</span>
                      <span className={`${styles.blogStatus} ${post.published ? styles.blogPublished : styles.blogDraft}`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <span className={styles.blogDate}>{post.date}</span>
                    </div>
                    <h3 className={styles.blogItemTitle}>{post.title}</h3>
                    <p className={styles.blogItemExcerpt}>{post.excerpt?.slice(0, 100)}…</p>
                  </div>
                </div>
                <div className={styles.blogItemActions}>
                  <button className={styles.actionBtn} onClick={() => openEdit(post)}>Edit</button>
                  <button
                    className={`${styles.actionBtn} ${post.published ? styles.actionUnpublish : styles.actionPublish}`}
                    onClick={() => handlePublishToggle(post)}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.actionDelete}`}
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                  >
                    {deleting === post.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
