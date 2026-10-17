import type {
  Project,
  Skill,
  BlogPost,
  Testimonial,
  ContactPayload,
  ContactResponse,
} from "../types";

const API_BASE = "http://localhost:8000/api";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const err = new Error(`Request failed: ${res.status}`);
    (err as unknown as Record<string, unknown>).status = res.status;
    (err as unknown as Record<string, unknown>).body = body;
    throw err;
  }
  return res.json();
}

export function fetchProjects() {
  return request<Project[]>(`${API_BASE}/projects/`);
}

export function fetchSkills() {
  return request<Skill[]>(`${API_BASE}/skills/`);
}

export function fetchBlogPosts() {
  return request<BlogPost[]>(`${API_BASE}/blog/`);
}

export function fetchTestimonials() {
  return request<Testimonial[]>(`${API_BASE}/testimonials/`);
}

export function submitContact(data: ContactPayload) {
  return request<ContactResponse>(`${API_BASE}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
