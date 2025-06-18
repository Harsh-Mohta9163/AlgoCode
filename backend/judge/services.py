import os
import docker
import tempfile
from typing import Dict, List
from pathlib import Path
from django.conf import settings

class JudgeService:
    """Service to handle code execution in isolated Docker containers"""
    
    def __init__(self):
        self.client = docker.from_env()
        self.MEMORY_LIMIT = '512m'
        self.CPU_TIMEOUT = 2  # seconds
        self.SUPPORTED_LANGUAGES = {
            'python': {'ext': 'py', 'image': 'judge-python'},
            'cpp': {'ext': 'cpp', 'image': 'judge-cpp'},
            'java': {'ext': 'java', 'image': 'judge-java'}
        }

    def judge_submission(self, submission) -> Dict:
        """
        Judge a submission against all test cases
        Returns verdict with execution metrics
        """
        if submission.language not in self.SUPPORTED_LANGUAGES:
            return {
                'status': 'error',
                'message': f'Unsupported language: {submission.language}'
            }

        # Access test cases from problem's JSON field
        test_cases = submission.problem.test_cases
        results = []

        for test_case in test_cases:
            result = self.run_test_case(
                code=submission.code,
                language=submission.language,
                test_input=test_case['input'],    # Changed to match your JSON structure
                expected_output=test_case['output']  # Changed to match your JSON structure
            )
            results.append(result)
            
            # Early return if critical error
            if result['status'] in ['runtime_error', 'time_limit_exceeded']:
                return result

        return self._evaluate_results(results)

    # def run_test_case(self, code: str, language: str, test_input: str, expected_output: str) -> Dict:
    #     """Run a single test case in Docker container"""
    #     print("\n=== JUDGE DEBUG START ===")
    #     print("Language:", language)
    #     print("Code:\n", code)
    #     print("Input:\n", repr(test_input))
    #     print("Expected Output:\n", repr(expected_output))
    #     with tempfile.TemporaryDirectory() as temp_dir:
    #         self._setup_files(temp_dir, code, test_input, language)
    #         try:
    #             # container = self.client.containers.run(
    #             #     self.SUPPORTED_LANGUAGES[language]['image'],
    #             #     command="python /judge/run.py",  # Explicitly specify command
    #             #     volumes={
    #             #         temp_dir: {
    #             #             'bind': '/judge',
    #             #             'mode': 'ro'
    #             #         }
    #             #     },
    #             #     working_dir="/judge",  # Set working directory
    #             #     mem_limit=self.MEMORY_LIMIT,
    #             #     pids_limit=50,
    #             #     network_disabled=True,
    #             #     detach=True,
    #             #     remove=False
    #             # )
    #             container = self.client.containers.run(
    #                 self.SUPPORTED_LANGUAGES[language]['image'],
    #                 command=["python", "/judge/run.py"],
    #                 volumes={
    #                     temp_dir: {
    #                         'bind': '/judge',
    #                         'mode': 'rw'  # Changed to rw to ensure we can write output
    #                     }
    #                 },
    #                 working_dir="/judge",
    #                 mem_limit=self.MEMORY_LIMIT,
    #                 pids_limit=50,
    #                 network_disabled=True,
    #                 detach=True,
    #                 remove=False
    #             )

    #             try:
    #                 result = container.wait(timeout=self.CPU_TIMEOUT)
    #                 logs = container.logs().decode('utf-8')
    #                 print("Raw Output (logs):\n", repr(logs))
    #                 if result['StatusCode'] != 0:
    #                     print("Status: runtime_error")
    #                     print("=== JUDGE DEBUG END ===\n")
    #                     return {
    #                         'status': 'runtime_error',
    #                         'message': logs
    #                     }

    #                 check = self._check_output(logs, expected_output)
    #                 print("Actual Output:\n", repr(check.get('actual', logs.split('===METRICS===')[0].strip())))
    #                 print("Status:", check['status'])
    #                 print("=== JUDGE DEBUG END ===\n")
            
    #                 return check

    #             except docker.errors.ContainerError:
    #                 print("Status: time_limit_exceeded")
    #                 print("=== JUDGE DEBUG END ===\n")
    #                 return {
    #                     'status': 'time_limit_exceeded',
    #                     'message': f'Exceeded {self.CPU_TIMEOUT} seconds'
    #                 }
    #         except Exception as e:
    #             print("Status: error")
    #             print("Error Message:", str(e))
    #             print("=== JUDGE DEBUG END ===\n")
    #             return {
    #                 'status': 'error',
    #                 'message': str(e)
    #             }
    #         finally:
    #             try:
    #                 container.remove(force=True)
    #             except:
    #                 pass

    def run_test_case(self, code: str, language: str, test_input: str, expected_output: str) -> Dict:
        """Run a single test case in Docker container"""
        print("\n=== JUDGE DEBUG START ===")
        print("Language:", language)
        print("Code:\n", code)
        print("Input:\n", repr(test_input))
        print("Expected Output:\n", repr(expected_output))
        
        with tempfile.TemporaryDirectory() as temp_dir:
            # Setup files
            try:
                self._setup_files(temp_dir, code, test_input, language)
            except Exception as e:
                print("Status: setup_error")
                print("Error Message:", str(e))
                print("=== JUDGE DEBUG END ===\n")
                return {
                    'status': 'error',
                    'message': f'Setup error: {str(e)}'
                }

            try:
                # Run container with proper configuration
                container = self.client.containers.run(
                    self.SUPPORTED_LANGUAGES[language]['image'],
                    command=["python", "/judge/run.py"],
                    volumes={
                        temp_dir: {
                            'bind': '/judge',
                            'mode': 'rw'
                        }
                    },
                    working_dir="/judge",
                    mem_limit=self.MEMORY_LIMIT,
                    pids_limit=50,
                    network_disabled=True,
                    detach=True,
                    remove=False,
                    stdout=True,
                    stderr=True
                )

                try:
                    # Wait for container execution with timeout
                    result = container.wait(timeout=self.CPU_TIMEOUT)
                    logs = container.logs().decode('utf-8').strip()
                    print("Raw Output (logs):\n", repr(logs))

                    # Check for runtime errors
                    if result['StatusCode'] != 0:
                        print("Status: runtime_error")
                        print("=== JUDGE DEBUG END ===\n")
                        return {
                            'status': 'runtime_error',
                            'message': logs
                        }

                    # Split metrics from output if present
                    output_parts = logs.split('===METRICS===')
                    actual_output = output_parts[0].strip()
                    
                    # Compare with expected output
                    check = self._check_output(actual_output, expected_output)
                    print("Comparing actual_output and expected_output:")
                    print(f"actual_output: {repr(actual_output)}")
                    print(f"expected_output: {repr(expected_output)}")
                    print("Actual Output:\n", repr(check.get('actual', actual_output)))
                    print("Status:", check['status'])
                    print("=== JUDGE DEBUG END ===\n")
                    
                    # Add metrics if available
                    if len(output_parts) > 1:
                        metrics = self._parse_metrics(output_parts[1])
                        check.update(metrics)

                    return check

                except docker.errors.ContainerError:
                    print("Status: time_limit_exceeded")
                    print("=== JUDGE DEBUG END ===\n")
                    return {
                        'status': 'time_limit_exceeded',
                        'message': f'Exceeded {self.CPU_TIMEOUT} seconds'
                    }
                
            except Exception as e:
                print("Status: error")
                print("Error Message:", str(e))
                print("=== JUDGE DEBUG END ===\n")
                return {
                    'status': 'error',
                    'message': str(e)
                }
            finally:
                try:
                    container.remove(force=True)
                except:
                    pass

    # def _parse_metrics(self, metrics_str: str) -> Dict:
    #     """Parse metrics from container output"""
    #     metrics = {}
    #     for line in metrics_str.split('\n'):
    #         if ':' in line:
    #             key, value = line.split(':', 1)
    #             if 'time' in key:
    #                 metrics['execution_time'] = float(value)
    #             elif 'memory' in key:
    #                 metrics['memory_used'] = int(value)
    #     return metrics
    def _parse_metrics(self, metrics_str: str) -> Dict:
        """Parse metrics from container output"""
        metrics = {}
        try:
            for line in metrics_str.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    if 'time' in key:
                        # Convert to milliseconds and round to 2 decimal places
                        metrics['execution_time'] = round(float(value), 2)
                    elif 'memory' in key:
                        # Convert to MB and round to 2 decimal places
                        metrics['memory_used'] = round(int(value) / 1024, 2)
        except:
            metrics['execution_time'] = 0
            metrics['memory_used'] = 0
        return metrics

    def _check_output(self, actual: str, expected: str) -> Dict:
        """Compare actual output with expected output"""
        actual = actual.strip()
        expected = expected.strip()
        
        if actual == expected:
            return {
                'status': 'accepted',
                'actual': actual
            }
        else:
            return {
                'status': 'wrong_answer',
                'actual': actual,
                'expected': expected
            }

    # def _setup_files(self, temp_dir: str, code: str, test_input: str, language: str):
    #     """Create necessary files for judge"""
    #     lang_config = self.SUPPORTED_LANGUAGES[language]
        
    #     # Save code file
    #     code_file = os.path.join(temp_dir, f"solution.{lang_config['ext']}")
    #     with open(code_file, 'w', encoding='utf-8') as f:
    #         f.write(code)

    #     # Save input file
    #     input_file = os.path.join(temp_dir, "input.txt")
    #     with open(input_file, 'w', encoding='utf-8') as f:
    #         f.write(test_input)

    def _setup_files(self, temp_dir: str, code: str, test_input: str, language: str):
        """Create necessary files for judge"""
        # Copy run.py to temp directory
        run_py_path = os.path.join(Path(__file__).parent.parent, 'docker', 'python', 'run.py')
        if os.path.exists(run_py_path):
            with open(run_py_path, 'r') as src, open(os.path.join(temp_dir, 'run.py'), 'w') as dst:
                dst.write(src.read())
        
        # Save code file
        code_file = os.path.join(temp_dir, f"solution.py")
        with open(code_file, 'w', encoding='utf-8') as f:
            f.write(code)

        # Save input file
        input_file = os.path.join(temp_dir, "input.txt")
        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(test_input)

    def _check_output(self, logs: str, expected_output: str) -> Dict:
        """Compare output and extract metrics"""
        parts = logs.split('===METRICS===')
        actual_output = parts[0].strip()
        # Debug print for output comparison
        print("Comparing actual_output and expected_output:")
        print("actual_output:", repr(actual_output))
        print("expected_output:", repr(expected_output.strip()))
        if actual_output != expected_output.strip():
            return {
                'status': 'wrong_answer',
                'actual': actual_output,
                'expected': expected_output.strip()
            }
        metrics = self._parse_metrics(parts[1] if len(parts) > 1 else '')
        return {
            'status': 'accepted',
            'execution_time': metrics.get('time', 0),
            'memory_used': metrics.get('memory', 0)
        }

    def _parse_metrics(self, metrics_str: str) -> Dict:
        """Parse execution metrics from container output"""
        metrics = {}
        for line in metrics_str.split('\n'):
            if line.startswith('time:'):
                metrics['time'] = float(line.split(':')[1])
            elif line.startswith('memory:'):
                metrics['memory'] = int(line.split(':')[1])
        return metrics

    def _evaluate_results(self, results: List[Dict]) -> Dict:
        """Determine final verdict from all test results"""
        # If any test failed, return that result
        for result in results:
            if result['status'] != 'accepted':
                return result

        # All tests passed - return best metrics
        return {
            'status': 'accepted',
            'execution_time': max(r['execution_time'] for r in results),
            'memory_used': max(r['memory_used'] for r in results)
        }




