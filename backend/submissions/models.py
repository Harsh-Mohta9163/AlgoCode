from django.db import models
from django.contrib.auth import get_user_model

class Problem(models.Model):
    """Store problem execution details and test cases"""
    problem_id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    test_cases = models.JSONField(default=list)
    time_limit = models.IntegerField(default=2000)  # in milliseconds
    memory_limit = models.IntegerField(default=512000)  # in KB

    class Meta:
        db_table = 'problem'

    def __str__(self):
        return self.title

class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('running', 'Running'),
        ('accepted', 'Accepted'),
        ('wrong_answer', 'Wrong Answer'),
        ('time_limit', 'Time Limit Exceeded'),
        ('compilation_error', 'Compilation Error'),
        ('runtime_error', 'Runtime Error'),
        ('error', 'Error') 
    ]

    LANGUAGE_CHOICES = [
        ('python', 'Python'),
        ('cpp', 'C++'),
        ('java', 'Java')
    ]

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, to_field='problem_id')
    code = models.TextField()
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    execution_time = models.FloatField(null=True)
    memory_used = models.IntegerField(null=True)  # in KB
    error_message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'submission'
        ordering = ['-created_at']