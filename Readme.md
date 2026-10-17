# Nur Pratap Karki | Portfolio

A full-stack personal portfolio with a React frontend and a Django REST API. Portfolio content is managed through Django Admin and loaded by the frontend from the API.

## Features

- Responsive portfolio pages for the home page, projects, blog posts, testimonials, and contact.
- Project, skill, published blog post, and testimonial data fetched from the backend API.
- Contact form with client-side validation and server-side validation; submissions are saved for review in Django Admin.
- Django Admin content management, plus an idempotent command for loading sample portfolio content.
- Loading, error, and empty states for API-backed content.

## Stack

| Area | Technology |
|---|---|
| Frontend | React 19, TypeScript, React Router, Vite |
| Styling | Tailwind CSS 4 and project CSS |
| Backend | Django 4.2, Django REST Framework |
| Database | SQLite |

## Project Layout

```text
portfolio/
├── api/                         # API contract shared by the frontend and backend
│   └── CONTRACT.md
├── frontend/                    # React application
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── services/api.ts       # API client
└── nurpratapkarki/              # Django project
    ├── api/                     # Models, serializers, API views and tests
    ├── nurpratapkarki/          # Django settings and URL configuration
    ├── db.sqlite3
    ├── manage.py
    └── requirements.txt
```

## Prerequisites

- Node.js supported by Vite 7 (Node.js 20.19+ or 22.12+).
- Python 3.8–3.12 for the pinned Django 4.2 release.

## Run Locally

Start the backend first. In a terminal, from the repository root:

```bash
cd nurpratapkarki
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m pip install django-jazzmin
python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser
python manage.py runserver
```

Jazzmin is enabled in Django settings but is currently missing from `requirements.txt`, so install it separately as shown above. The seed command creates sample projects, skills, published posts, and testimonials. It is safe to run more than once. Replace or edit sample content in the admin at <http://localhost:8000/admin/>. Contact form submissions are also reviewable there.

In another terminal, from the repository root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at <http://localhost:5173> and uses the API at `http://localhost:8000/api`. Django CORS is configured for the Vite development origin.

## API

The API contract, including response fields and examples, is documented in [api/CONTRACT.md](api/CONTRACT.md).

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/projects/` | List projects |
| `GET` | `/api/skills/` | List skills |
| `GET` | `/api/blog/` | List published blog posts |
| `GET` | `/api/testimonials/` | List testimonials |
| `POST` | `/api/contact/` | Validate and save a contact submission |

The frontend API base URL is currently configured directly in `frontend/src/services/api.ts`. Contact submissions are stored in the database; the project does not currently send email notifications.

## Development Checks

Run frontend checks from `frontend/`:

```bash
npm run lint
npm run build
```

Run backend tests from `nurpratapapkarki/` with the virtual environment activated:

```bash
python manage.py test
```

There is no frontend test script currently configured.

## Current Configuration Notes

- Django uses SQLite at `nurpratapapkarki/db.sqlite3`.
- The checked-in Django settings use `DEBUG = True`, a development secret key, and local CORS configuration. They are for local development, not production deployment.
- `nurpratapapkarki/pyproject.toml` declares Python `>=3.13`, which conflicts with the pinned Django 4.2 dependency. The requirements file and Django version are the basis for the Python range above; project metadata should be aligned before packaging or deployment.
- No production deployment configuration or email delivery integration is included.