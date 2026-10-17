from rest_framework import generics, status
from rest_framework.response import Response

from .models import BlogPost, Project, Skill, Testimonial
from .serializers import (
    BlogPostSerializer,
    ContactSubmissionCreateSerializer,
    ProjectSerializer,
    SkillSerializer,
    TestimonialSerializer,
)


class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class SkillListAPIView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class BlogListAPIView(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True)


class TestimonialListAPIView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class ContactCreateAPIView(generics.CreateAPIView):
    serializer_class = ContactSubmissionCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()
        return Response(
            {
                'message': 'Contact submission received.',
                'submission_id': submission.id,
            },
            status=status.HTTP_201_CREATED,
        )
