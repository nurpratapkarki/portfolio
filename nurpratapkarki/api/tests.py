from io import StringIO

from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import BlogPost, ContactSubmission, Project, Skill, Testimonial


class PortfolioApiTests(APITestCase):
    def test_list_endpoints_start_empty(self):
        endpoints = [
            reverse('api:project-list'),
            reverse('api:skill-list'),
            reverse('api:blog-list'),
            reverse('api:testimonial-list'),
        ]
        for endpoint in endpoints:
            with self.subTest(endpoint=endpoint):
                response = self.client.get(endpoint)
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(response.json(), [])

    def test_contact_submission_success(self):
        payload = {
            'name': 'Nur Pratap Karki',
            'email': 'nur@example.com',
            'subject': 'Project inquiry',
            'message': 'I would like to discuss a portfolio collaboration.',
        }
        response = self.client.post(
            reverse('api:contact-create'),
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()['message'], 'Contact submission received.')
        self.assertEqual(ContactSubmission.objects.count(), 1)

    def test_contact_submission_validation_error(self):
        payload = {
            'name': 'N',
            'email': 'not-an-email',
            'subject': 'Hi',
            'message': 'short',
        }
        response = self.client.post(
            reverse('api:contact-create'),
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.json())
        self.assertIn('email', response.json())
        self.assertIn('subject', response.json())
        self.assertIn('message', response.json())


class SeedPortfolioCommandTests(APITestCase):
    def test_seed_command_creates_public_content_and_is_idempotent(self):
        output = StringIO()

        call_command('seed_portfolio', stdout=output)

        self.assertEqual(Project.objects.count(), 3)
        self.assertEqual(Skill.objects.count(), 10)
        self.assertEqual(BlogPost.objects.count(), 2)
        self.assertEqual(Testimonial.objects.count(), 2)
        self.assertEqual(ContactSubmission.objects.count(), 0)
        self.assertTrue(BlogPost.objects.filter(is_published=True).exists())
        self.assertIn(
            'Django REST Framework',
            Project.objects.get(title='Personal Portfolio').tech_stack,
        )
        self.assertIn('Portfolio seed complete', output.getvalue())

        self.assertEqual(
            len(self.client.get(reverse('api:project-list')).json()), 3
        )
        self.assertEqual(len(self.client.get(reverse('api:skill-list')).json()), 10)
        self.assertEqual(len(self.client.get(reverse('api:blog-list')).json()), 2)
        self.assertEqual(
            len(self.client.get(reverse('api:testimonial-list')).json()), 2
        )

        call_command('seed_portfolio', stdout=StringIO())

        self.assertEqual(Project.objects.count(), 3)
        self.assertEqual(Skill.objects.count(), 10)
        self.assertEqual(BlogPost.objects.count(), 2)
        self.assertEqual(Testimonial.objects.count(), 2)
