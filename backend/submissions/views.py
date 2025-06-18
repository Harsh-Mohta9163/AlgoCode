from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Submission, Problem
from .serializers import SubmissionSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Submission.objects.filter(user=self.request.user)
        problem_id = self.request.query_params.get('problem_id', None)
        if problem_id is not None:
            queryset = queryset.filter(problem__problem_id=problem_id)
        return queryset.order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        # Get or create problem instance
        problem, _ = Problem.objects.get_or_create(
            problem_id=request.data.get('problem_id'),
            defaults={'title': request.data.get('problem_id')}  # Using ID as title temporarily
        )
        
        # Create submission
        submission = Submission.objects.create(
            user=request.user,
            problem=problem,
            code=request.data.get('code'),
            language=request.data.get('language')
        )
        
        serializer = self.get_serializer(submission)
        return Response(serializer.data)