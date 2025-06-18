from django.shortcuts import render
from judge.services import JudgeService

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
        print("Received data Hello123:", request.data)
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=400)
                
        # Create submission with pending status
        submission = serializer.save(
            user=request.user,
            status='pending'
        )
        print("hello1")
        # Initialize judge
        judge = JudgeService()
        print("hello2")
        # Run against test cases
        for test_case in submission.problem.test_cases:
            result = judge.run_test_case(
                code=submission.code,
                language=submission.language,
                test_input=test_case['input'],
                expected_output=test_case['output']
            )
            
            # Update submission status
            submission.status = result['status']
            submission.execution_time = result.get('execution_time')
            submission.memory_used = result.get('memory_used')
            submission.error_message = result.get('message')
            submission.save()
            
            # Stop if any test case fails
            if result['status'] != 'accepted':
                break

        return Response(self.get_serializer(submission).data)





# from django.shortcuts import render
# from judge.services import JudgeService

# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Submission, Problem
# from .serializers import SubmissionSerializer

# class SubmissionViewSet(viewsets.ModelViewSet):
#     serializer_class = SubmissionSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         queryset = Submission.objects.filter(user=self.request.user)
#         problem_id = self.request.query_params.get('problem_id', None)
#         if problem_id is not None:
#             queryset = queryset.filter(problem__problem_id=problem_id)
#         return queryset.order_by('-created_at')
    
#     # ...existing code...

#     def create(self, request, *args, **kwargs):
#         print("Received data Hello123:", request.data)
#         serializer = self.get_serializer(data=request.data)
#         if not serializer.is_valid():
#             print("Serializer errors:", serializer.errors)
#             return Response(serializer.errors, status=400)
                
#         # Create submission with pending status
#         submission = serializer.save(
#             user=request.user,
#             status='pending'
#         )
        
#         try:
#             print("hello1")
#             judge = JudgeService()
#             print("hello2")

#             # Get test cases
#             test_cases = submission.problem.test_cases
#             if not test_cases:
#                 submission.status = 'error'
#                 submission.error_message = 'No test cases found for this problem'
#                 submission.save()
#                 return Response(self.get_serializer(submission).data)

#             # Run against test cases
#             for test_case in test_cases:
#                 result = judge.run_test_case(
#                     code=submission.code,
#                     language=submission.language,
#                     test_input=test_case['input'],
#                     expected_output=test_case['output']
#                 )
                
#                 # Update submission status
#                 submission.status = result['status']
#                 submission.execution_time = result.get('execution_time')
#                 submission.memory_used = result.get('memory_used')
#                 submission.error_message = result.get('message')
#                 submission.save()
                
#                 # Stop if any test case fails
#                 if result['status'] != 'accepted':
#                     break

#             return Response(self.get_serializer(submission).data)

#         except Exception as e:
#             submission.status = 'error'
#             submission.error_message = f'Judging error: {str(e)}'
#             submission.save()
#             return Response(self.get_serializer(submission).data)