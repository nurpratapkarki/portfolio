from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class OrderedModel(models.Model):
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True


class Project(TimeStampedModel, OrderedModel):
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    tech_stack = models.JSONField(default=list, blank=True)
    repository_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ('display_order', '-created_at')

    def __str__(self) -> str:
        return self.title


class Skill(OrderedModel):
    name = models.CharField(max_length=120)
    category = models.CharField(max_length=120, blank=True)
    proficiency = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
    )

    class Meta:
        ordering = ('display_order', 'name')

    def __str__(self) -> str:
        return self.name


class BlogPost(TimeStampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    excerpt = models.CharField(max_length=300)
    content = models.TextField()
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ('-published_at', '-created_at')

    def save(self, *args, **kwargs):
        if self.is_published and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class Testimonial(TimeStampedModel, OrderedModel):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, blank=True)
    company = models.CharField(max_length=120, blank=True)
    quote = models.TextField()
    avatar_url = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ('display_order', '-created_at')

    def __str__(self) -> str:
        return self.name


class ContactSubmission(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self) -> str:
        return f'{self.name} <{self.email}>'
