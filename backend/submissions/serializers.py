from rest_framework import serializers
from .models import Submission, Problem

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['problem_id', 'title']

class SubmissionSerializer(serializers.ModelSerializer):
    problem_detail = ProblemSerializer(source='problem', read_only=True)
    status_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Submission
        fields = [
            'id', 'problem', 'problem_detail', 'code', 
            'language', 'status', 'status_display',
            'execution_time', 'memory_used', 
            'error_message', 'created_at'
        ]
        read_only_fields = [
            'status', 'execution_time', 'memory_used', 
            'error_message', 'created_at'
        ]
    
    def get_status_display(self, obj):
        return dict(Submission.STATUS_CHOICES)[obj.status]