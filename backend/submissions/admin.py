from django.contrib import admin
from .models import Problem, Submission

@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ('problem_id', 'title')
    search_fields = ('problem_id', 'title')

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'problem', 'language', 'status', 'created_at')
    list_filter = ('status', 'language', 'created_at')
    search_fields = ('user__username', 'problem__problem_id')
    readonly_fields = ('created_at',)