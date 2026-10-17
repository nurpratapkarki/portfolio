# Nur Pratap Karki — Personal Portfolio

> **Full Stack Developer** · Built by two AIs in coordination: Claude Code (Frontend) + Codex (Backend)

---

## Project Overview

This is a personal portfolio website for Nur Pratap Karki, a Full Stack Developer. The project uses a split-stack architecture with two AI agents responsible for distinct domains. Codex owns the backend API contract and Django implementation. Claude Code owns the React frontend and all UI logic. Neither AI should touch the other's domain without explicit instruction from the human owner.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Django + Django REST Framework |
| Styling | Black and white, light mode, minimal |
| Auth / Admin | Django Admin (for content management) |

---

## AI Coordination Protocol

### Ground Rule
**Codex defines the API contract first. Claude Code builds the UI against that contract.**

This means:
1. Codex writes and commits the API endpoints, serializers, and response shapes
2. Codex documents the contract in `/api/CONTRACT.md` before Claude Code begins any data-fetching work
3. Claude Code reads `/api/CONTRACT.md` and builds all fetch calls, types, and UI states based strictly on what is documented there
4. If Claude Code needs a field or endpoint that doesn't exist, it must flag it with a `TODO:` comment and notify the human — it does not modify the backend

### File Domain Ownership

```
/frontend        ← Claude Code's domain
/backend         ← Codex's domain
/api/CONTRACT.md ← Codex writes, Claude Code reads
README.md        ← shared, updated by both
```

Neither AI modifies files outside its domain. If a cross-domain change is needed, it is flagged in a comment and left for the human to decide.

---

## Repository Structure

```
portfolio/
├── frontend/                  # Claude Code owns this
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/          # API fetch functions (reads CONTRACT.md)
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                   # Codex owns this
│   ├── portfolio/             # Django project
│   ├── api/                   # DRF app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
│
└── api/
    └── CONTRACT.md            # Single source of truth for API shape
```

---

## API Contract (Bootstrap)

Codex must populate `/api/CONTRACT.md` with the following endpoints before Claude Code begins. A placeholder shape is provided below as the starting schema — Codex should confirm or revise before Claude Code reads it.

```
GET  /api/projects/        → list of project objects
GET  /api/skills/          → list of skill objects
GET  /api/blog/            → list of blog post objects
GET  /api/testimonials/    → list of testimonial objects
POST /api/contact/         → submit contact form
```

Each endpoint response must document: HTTP method, URL, response fields (name, type, nullable), and example JSON. Until `CONTRACT.md` is complete and committed, Claude Code must render all data-dependent sections in a **placeholder/skeleton state** — no hardcoded fake data, no guessing at field names.

---

## Sections

| Section | Status | Data Source |
|---|---|---|
| Hero / Intro | Static — no API needed | Hardcoded in component |
| Projects | Placeholder until API contract is ready | `GET /api/projects/` |
| Skills | Placeholder until API contract is ready | `GET /api/skills/` |
| Blog | Placeholder until API contract is ready | `GET /api/blog/` |
| Contact Form | Form UI ready; POST wired after contract | `POST /api/contact/` |
| Testimonials | Placeholder until API contract is ready | `GET /api/testimonials/` |

---

## Design System

Claude Code must follow these rules without deviation:

- **Color palette:** White background (`#FFFFFF`), black text (`#000000`), grey for secondary text (`#6B7280`), no color accents
- **Font:** System sans-serif stack or Inter — nothing decorative
- **Spacing:** Generous whitespace, content-first layout
- **Mode:** Light mode only — no dark mode toggle
- **Borders / Dividers:** Thin `1px` black or grey lines only
- **Hover states:** Subtle — underlines on links, slight opacity shifts on buttons
- **No gradients, no shadows, no illustrations**
- **Tailwind only** — no inline styles, no external component libraries

---

## Working States for Placeholder Sections

Until the API contract is confirmed and the backend is running, all data-fetched sections must render in a clearly labeled skeleton state:

```jsx
// Correct placeholder pattern
<section>
  <p className="text-gray-400 text-sm">[ Projects — awaiting API contract ]</p>
</section>
```

Do not use `Lorem ipsum`, fake project cards, or invented data. The site must be visually honest about what is real and what is pending.

---

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Runs at http://localhost:8000
```

### CORS
Codex must configure Django CORS headers to allow `http://localhost:5173` in development.

---

## For Claude Code — Instructions

You are responsible for the entire `/frontend` directory and nothing else.

1. Read `/api/CONTRACT.md` before writing any data-fetching logic
2. If `CONTRACT.md` does not exist or is incomplete, render placeholder states and stop — do not invent API shapes
3. Follow the design system above exactly — black, white, minimal, light mode
4. All API calls go in `/frontend/src/services/` — never fetch directly inside components
5. Handle loading, error, and empty states for every data-fetched section
6. The Hero section is fully static — owner's name is **Nur Pratap Karki**, role is **Full Stack Developer**
7. Keep code clean — no decision comments, no AI attribution in code

---

## For Codex — Instructions

You are responsible for the entire `/backend` directory and the `/api/CONTRACT.md` file.

1. Your first task is always to write `/api/CONTRACT.md` with full endpoint documentation before any frontend work begins
2. Use Django REST Framework for all API endpoints
3. All models should support creation/editing via Django Admin so the owner can manage content without touching code
4. Enable CORS for `http://localhost:5173` in development
5. The contact form endpoint must validate input server-side and return clear error messages
6. Projects, Skills, Blog, and Testimonials start empty — the Django Admin is how the owner will populate them
7. Keep code clean — no decision comments, no AI attribution in code

---

## Human Owner Instructions

You are **Nur Pratap Karki**. Here is how to manage this project:

- Add or edit portfolio content via Django Admin at `http://localhost:8000/admin`
- To add a project, skill, blog post, or testimonial: log into Admin, find the relevant model, create an entry
- To change the visual design: edit components in `/frontend/src/components/` or update `tailwind.config.js`
- If you want the two AIs to do more work: give Claude Code tasks scoped to `/frontend`, give Codex tasks scoped to `/backend`
- If something needs to cross the boundary (e.g. a new API endpoint AND a new UI section), instruct both AIs in the same session and point them to this README

---

## Coordination Test Checklist

This project is also an experiment in AI-to-AI coordination. Use this checklist to verify the handoff worked:

- [ ] Codex has written `/api/CONTRACT.md` with all endpoint shapes documented
- [ ] Claude Code renders placeholder states for all API-dependent sections before contract is ready
- [ ] After contract is ready, Claude Code wires all fetches correctly using only documented field names
- [ ] No hardcoded fake data exists anywhere in the frontend
- [ ] Backend models are all manageable via Django Admin
- [ ] CORS is configured correctly
- [ ] Contact form validates on both frontend and backend
- [ ] The site looks correct: white, black, minimal, light mode, no color accents