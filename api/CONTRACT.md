# API Contract

Base URL in local development: `http://localhost:8000`

All responses are JSON.

## `GET /api/projects/`

Returns all projects ordered by `display_order` ascending, then newest first.

### Response Fields

| Field | Type | Nullable | Notes |
|---|---|---|---|
| id | integer | no | Auto-generated primary key |
| title | string | no | Project title |
| summary | string | no | Short summary |
| description | string | no | Full description (can be empty string) |
| tech_stack | array[string] | no | Technology list (can be empty array) |
| repository_url | string (URL) | yes | Source repository URL |
| live_url | string (URL) | yes | Live deployment URL |
| featured | boolean | no | Featured flag |
| display_order | integer | no | Sort order |
| created_at | string (ISO 8601 datetime) | no | Creation timestamp |
| updated_at | string (ISO 8601 datetime) | no | Last update timestamp |

### Example `200 OK`

```json
[
  {
    "id": 1,
    "title": "Portfolio Website",
    "summary": "Personal portfolio built with React and Django.",
    "description": "A full-stack portfolio with CMS-backed content.",
    "tech_stack": ["React", "Django", "Tailwind CSS"],
    "repository_url": "https://github.com/nurpratapkarki/portfolio",
    "live_url": "https://example.com",
    "featured": true,
    "display_order": 0,
    "created_at": "2026-02-25T08:00:00Z",
    "updated_at": "2026-02-25T09:00:00Z"
  }
]
```

## `GET /api/skills/`

Returns all skills ordered by `display_order` ascending, then name ascending.

### Response Fields

| Field | Type | Nullable | Notes |
|---|---|---|---|
| id | integer | no | Auto-generated primary key |
| name | string | no | Skill name |
| category | string | no | Optional grouping label (can be empty string) |
| proficiency | integer | yes | 1-100 scale |
| display_order | integer | no | Sort order |

### Example `200 OK`

```json
[
  {
    "id": 1,
    "name": "Django",
    "category": "Backend",
    "proficiency": 90,
    "display_order": 0
  }
]
```

## `GET /api/blog/`

Returns only published blog posts (`is_published = true`), newest first.

### Response Fields

| Field | Type | Nullable | Notes |
|---|---|---|---|
| id | integer | no | Auto-generated primary key |
| title | string | no | Post title |
| slug | string | no | Unique slug |
| excerpt | string | no | Summary text |
| content | string | no | Full post content |
| published_at | string (ISO 8601 datetime) | yes | Publish timestamp |
| created_at | string (ISO 8601 datetime) | no | Creation timestamp |

### Example `200 OK`

```json
[
  {
    "id": 1,
    "title": "How I Build APIs",
    "slug": "how-i-build-apis",
    "excerpt": "A practical process for reliable APIs.",
    "content": "Long-form blog content...",
    "published_at": "2026-02-25T07:00:00Z",
    "created_at": "2026-02-24T10:00:00Z"
  }
]
```

## `GET /api/testimonials/`

Returns all testimonials ordered by `display_order` ascending, then newest first.

### Response Fields

| Field | Type | Nullable | Notes |
|---|---|---|---|
| id | integer | no | Auto-generated primary key |
| name | string | no | Person name |
| role | string | no | Person role (can be empty string) |
| company | string | no | Company name (can be empty string) |
| quote | string | no | Testimonial content |
| avatar_url | string (URL) | yes | Avatar image URL |
| display_order | integer | no | Sort order |
| created_at | string (ISO 8601 datetime) | no | Creation timestamp |

### Example `200 OK`

```json
[
  {
    "id": 1,
    "name": "Jane Smith",
    "role": "Engineering Manager",
    "company": "Acme Corp",
    "quote": "Nur consistently delivers production-ready code.",
    "avatar_url": "https://example.com/jane.jpg",
    "display_order": 0,
    "created_at": "2026-02-25T06:00:00Z"
  }
]
```

## `POST /api/contact/`

Creates a contact submission.

### Request Body Fields

| Field | Type | Nullable | Validation |
|---|---|---|---|
| name | string | no | Minimum 2 characters after trimming |
| email | string (email) | no | Must be a valid email |
| subject | string | no | Minimum 3 characters after trimming |
| message | string | no | 10 to 5000 characters after trimming |

### Example Request

```json
{
  "name": "Nur Pratap Karki",
  "email": "nur@example.com",
  "subject": "Project inquiry",
  "message": "I would like to discuss a full-stack project."
}
```

### Example `201 Created`

```json
{
  "message": "Contact submission received.",
  "submission_id": 1
}
```

### Example `400 Bad Request`

```json
{
  "name": ["Name must be at least 2 characters long."],
  "email": ["Enter a valid email address."],
  "subject": ["Subject must be at least 3 characters long."],
  "message": ["Message must be at least 10 characters long."]
}
```
