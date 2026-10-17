export interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  tech_stack: string[];
  repository_url: string | null;
  live_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number | null;
  display_order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published_at: string | null;
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar_url: string | null;
  display_order: number;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  submission_id: number;
}

export interface ContactErrors {
  name?: string[];
  email?: string[];
  subject?: string[];
  message?: string[];
}
