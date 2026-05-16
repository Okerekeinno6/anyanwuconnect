/**
 * api.ts — AnyanwuConnect Frontend API Client
 * Connects to the Flask backend. Reads NEXT_PUBLIC_API_URL from env.
 * Falls back to localStorage when the API URL is not configured.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// ── Token management ──────────────────────────────────────────
const TOKEN_KEY = "anyanwu_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isBackendConfigured(): boolean {
  return !!API_URL;
}

// ── Shared fetch wrapper ───────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `HTTP ${res.status}`);
  }
  return data as T;
}

// ════════════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════════════

export async function apiLogin(username: string, password: string): Promise<string> {
  const data = await apiFetch<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  return data.token;
}

export async function apiVerifyToken(): Promise<boolean> {
  try {
    await apiFetch("/api/auth/verify");
    return true;
  } catch {
    clearToken();
    return false;
  }
}

// ════════════════════════════════════════════════════════════════
// SITE CONTENT
// ════════════════════════════════════════════════════════════════

export async function apiGetContent(): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>("/api/content");
}

export async function apiSaveContent(content: unknown): Promise<void> {
  await apiFetch("/api/content", {
    method: "PUT",
    body: JSON.stringify(content),
  });
}

// ════════════════════════════════════════════════════════════════
// BLOG POSTS
// ════════════════════════════════════════════════════════════════

export interface ApiBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  coverImage: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  tags: string[];
  published: boolean;
  readTime: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export async function apiGetBlogs(): Promise<ApiBlogPost[]> {
  return apiFetch<ApiBlogPost[]>("/api/blogs");
}

export async function apiGetBlog(slug: string): Promise<ApiBlogPost> {
  return apiFetch<ApiBlogPost>(`/api/blogs/${slug}`);
}

export async function apiCreateBlog(post: Partial<ApiBlogPost>): Promise<ApiBlogPost> {
  return apiFetch<ApiBlogPost>("/api/blogs", {
    method: "POST",
    body: JSON.stringify(post),
  });
}

export async function apiUpdateBlog(id: number, post: Partial<ApiBlogPost>): Promise<ApiBlogPost> {
  return apiFetch<ApiBlogPost>(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
}

export async function apiDeleteBlog(id: number): Promise<void> {
  await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
}

export async function apiUploadImage(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);
  
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  
  // Notice we use raw fetch instead of apiFetch because we don't want "Content-Type": "application/json"
  // The browser will automatically set the correct multipart/form-data boundary
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers,
    body: formData,
  });
  
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Image upload failed");
  }
  return data.url;
}

// ════════════════════════════════════════════════════════════════
// CONTACT MESSAGES
// ════════════════════════════════════════════════════════════════

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  date: string;
  createdAt: string;
}

export async function apiSubmitContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  await apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiGetMessages(): Promise<ContactMessage[]> {
  return apiFetch<ContactMessage[]>("/api/contact");
}

export async function apiMarkMessageRead(id: number): Promise<void> {
  await apiFetch(`/api/contact/${id}/read`, { method: "PATCH" });
}

export async function apiDeleteMessage(id: number): Promise<void> {
  await apiFetch(`/api/contact/${id}`, { method: "DELETE" });
}
