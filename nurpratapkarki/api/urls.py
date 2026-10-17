from django.urls import path

from .views import (
    BlogListAPIView,
    ContactCreateAPIView,
    ProjectListAPIView,
    SkillListAPIView,
    TestimonialListAPIView,
)

app_name = 'api'

urlpatterns = [
    path('projects/', ProjectListAPIView.as_view(), name='project-list'),
    path('skills/', SkillListAPIView.as_view(), name='skill-list'),
    path('blog/', BlogListAPIView.as_view(), name='blog-list'),
    path('testimonials/', TestimonialListAPIView.as_view(), name='testimonial-list'),
    path('contact/', ContactCreateAPIView.as_view(), name='contact-create'),
]
