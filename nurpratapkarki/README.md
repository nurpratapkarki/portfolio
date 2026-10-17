# Portfolio backend

## Add demo data

After applying the migrations, seed the public portfolio sections with:

```bash
cd nurpratapkarki
.venv/bin/python manage.py migrate
.venv/bin/python manage.py seed_portfolio
```

The command adds three projects, ten skills, two published blog posts, and two
testimonials. It is idempotent: running it again does not duplicate records or
alter contact-form submissions. Edit or replace this content later in Django
Admin at `http://localhost:8000/admin/`.
