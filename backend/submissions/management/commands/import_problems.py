from django.core.management.base import BaseCommand
import json
import os
from pathlib import Path
from submissions.models import Problem

class Command(BaseCommand):
    help = 'Import problems from frontend JSON files'

    def handle(self, *args, **options):
        # Get frontend data directory path
        frontend_dir = Path(__file__).resolve().parent.parent.parent.parent.parent / 'frontend' / 'public' / 'data'
        self.stdout.write(f'Looking for JSON files in: {frontend_dir}')

        # Only process problems_{company}.json files
        for filename in os.listdir(frontend_dir):
            if filename.startswith('problems_') and filename.endswith('.json'):
                company = filename.replace('problems_', '').replace('.json', '')
                self.stdout.write(f'Processing company: {company}')

                try:
                    with open(frontend_dir / filename, 'r', encoding='utf-8') as f:
                        problems = json.load(f)
                        
                        # Match frontend ID generation
                        for idx, problem_data in enumerate(problems):
                            problem_id = f"{company}_{idx}"  # Matches frontend ID format
                            
                            # Create or update problem
                            problem, created = Problem.objects.get_or_create(
                                problem_id=problem_id,
                                defaults={
                                    'title': problem_data['basic_info']['title'],
                                    'test_cases': [
                                        {
                                            "input": "1 2\n1 3\n2\n1 4\n2",
                                            "output": "2 3",
                                            "hidden": False
                                        }
                                    ]
                                }
                            )

                            if created:
                                self.stdout.write(
                                    self.style.SUCCESS(
                                        f'Created problem: {company}_{idx} - {problem.title}'
                                    )
                                )
                            else:
                                self.stdout.write(
                                    self.style.WARNING(
                                        f'Problem already exists: {company}_{idx}'
                                    )
                                )

                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(
                            f'Error processing {filename}: {str(e)}'
                        )
                    )