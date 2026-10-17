from rest_framework import serializers

from .models import BlogPost, ContactSubmission, Project, Skill, Testimonial


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'summary',
            'description',
            'tech_stack',
            'repository_url',
            'live_url',
            'featured',
            'display_order',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'created_at', 'updated_at')


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'category', 'proficiency', 'display_order')
        read_only_fields = ('id',)


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = (
            'id',
            'title',
            'slug',
            'excerpt',
            'content',
            'published_at',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = (
            'id',
            'name',
            'role',
            'company',
            'quote',
            'avatar_url',
            'display_order',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')


class ContactSubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ('name', 'email', 'subject', 'message')

    def validate_name(self, value):
        name = value.strip()
        if len(name) < 2:
            raise serializers.ValidationError(
                'Name must be at least 2 characters long.'
            )
        return name

    def validate_subject(self, value):
        subject = value.strip()
        if len(subject) < 3:
            raise serializers.ValidationError(
                'Subject must be at least 3 characters long.'
            )
        return subject

    def validate_message(self, value):
        message = value.strip()
        if len(message) < 10:
            raise serializers.ValidationError(
                'Message must be at least 10 characters long.'
            )
        if len(message) > 5000:
            raise serializers.ValidationError(
                'Message must be at most 5000 characters long.'
            )
        return message
