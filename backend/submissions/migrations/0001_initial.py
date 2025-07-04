# Generated by Django 5.2.3 on 2025-06-18 11:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('problem_id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('test_cases', models.JSONField(default=list)),
                ('time_limit', models.IntegerField(default=2000)),
                ('memory_limit', models.IntegerField(default=512000)),
            ],
            options={
                'db_table': 'problem',
            },
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
                ('language', models.CharField(choices=[('python', 'Python'), ('cpp', 'C++'), ('java', 'Java')], max_length=20)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('running', 'Running'), ('accepted', 'Accepted'), ('wrong_answer', 'Wrong Answer'), ('time_limit', 'Time Limit Exceeded'), ('compilation_error', 'Compilation Error'), ('runtime_error', 'Runtime Error')], default='pending', max_length=20)),
                ('execution_time', models.FloatField(null=True)),
                ('memory_used', models.IntegerField(null=True)),
                ('error_message', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='submissions.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'submission',
                'ordering': ['-created_at'],
            },
        ),
    ]
