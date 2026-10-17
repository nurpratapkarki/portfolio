"""Populate the public portfolio sections with repeatable demo content."""

from datetime import datetime, timezone as datetime_timezone

from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import BlogPost, Project, Skill, Testimonial


PROJECTS = (
    {
        "title": "Personal Portfolio",
        "summary": "A responsive portfolio that serves content from a Django REST API.",
        "description": (
            "A full-stack portfolio with editable projects, skills, blog posts, "
            "testimonials, and a validated contact form."
        ),
        "tech_stack": ["React", "TypeScript", "Django", "Django REST Framework"],
        "repository_url": "https://github.com/nurpratapkarki/portfolio",
        "live_url": None,
        "featured": True,
        "display_order": 1,
    },
    {
        "title": "Team Task Board",
        "summary": "A collaborative workspace for planning work and tracking delivery.",
        "description": (
            "A demo task-management product featuring role-based access, project "
            "boards, and activity history."
        ),
        "tech_stack": ["Django", "PostgreSQL", "React", "Docker"],
        "repository_url": "https://github.com/example/team-task-board",
        "live_url": "https://team-task-board.example.com",
        "featured": True,
        "display_order": 2,
    },
    {
        "title": "Local Market Finder",
        "summary": "A searchable directory that helps people discover local businesses.",
        "description": (
            "A sample directory application with location-aware search, business "
            "profiles, and an administration workflow."
        ),
        "tech_stack": ["Python", "Django", "REST API", "SQLite"],
        "repository_url": "https://github.com/example/local-market-finder",
        "live_url": None,
        "featured": False,
        "display_order": 3,
    },
)

SKILLS = (
    ("Python", "Backend", 92, 1),
    ("Django", "Backend", 90, 2),
    ("Django REST Framework", "Backend", 88, 3),
    ("PostgreSQL", "Backend", 82, 4),
    ("React", "Frontend", 86, 5),
    ("TypeScript", "Frontend", 82, 6),
    ("Tailwind CSS", "Frontend", 80, 7),
    ("HTML & CSS", "Frontend", 90, 8),
    ("Git", "Tools", 88, 9),
    ("Docker", "Tools", 75, 10),
)

BLOG_POSTS = (
    {
        "title": "Building a Portfolio API with Django REST Framework",
        "slug": "building-a-portfolio-api-with-django-rest-framework",
        "excerpt": "A practical outline for keeping portfolio content editable and API-driven.",
        "content": (
            "A portfolio should make content changes simple. Django Admin provides a "
            "useful editing interface, while Django REST Framework gives the frontend "
            "a consistent, typed response shape."
        ),
        "published_at": datetime(2026, 2, 20, 9, 0, tzinfo=datetime_timezone.utc),
    },
    {
        "title": "A Small Checklist for Reliable Frontend Data Fetching",
        "slug": "a-small-checklist-for-reliable-frontend-data-fetching",
        "excerpt": "Loading, empty, and error states turn an API integration into a dependable user experience.",
        "content": (
            "Every remote request can be loading, successful, empty, or unavailable. "
            "Making each state visible keeps an interface useful while content evolves."
        ),
        "published_at": datetime(2026, 1, 28, 9, 0, tzinfo=datetime_timezone.utc),
    },
)

TESTIMONIALS = (
    {
        "name": "Aarav Sharma",
        "role": "Product Manager",
        "company": "Northstar Labs",
        "quote": (
            "Nur brings a calm, practical approach to full-stack work and communicates "
            "clearly from planning through delivery."
        ),
        "avatar_url": None,
        "display_order": 1,
    },
    {
        "name": "Maya Patel",
        "role": "Design Lead",
        "company": "Studio Meridian",
        "quote": (
            "The final product was thoughtful, polished, and easy for our team to "
            "maintain after launch."
        ),
        "avatar_url": None,
        "display_order": 2,
    },
)


class Command(BaseCommand):
    help = "Add repeatable demo content for the public portfolio sections."

    @transaction.atomic
    def handle(self, *args, **options):
        created = {"projects": 0, "skills": 0, "blog posts": 0, "testimonials": 0}

        for project in PROJECTS:
            _, was_created = Project.objects.get_or_create(
                title=project["title"], defaults=project
            )
            created["projects"] += was_created

        for name, category, proficiency, display_order in SKILLS:
            _, was_created = Skill.objects.get_or_create(
                name=name,
                category=category,
                defaults={
                    "proficiency": proficiency,
                    "display_order": display_order,
                },
            )
            created["skills"] += was_created

        for post in BLOG_POSTS:
            _, was_created = BlogPost.objects.get_or_create(
                slug=post["slug"],
                defaults={**post, "is_published": True},
            )
            created["blog posts"] += was_created

        for testimonial in TESTIMONIALS:
            _, was_created = Testimonial.objects.get_or_create(
                name=testimonial["name"],
                company=testimonial["company"],
                defaults=testimonial,
            )
            created["testimonials"] += was_created

        summary = ", ".join(
            f"{count} {content_type}" for content_type, count in created.items()
        )
        self.stdout.write(self.style.SUCCESS(f"Portfolio seed complete: {summary}."))
