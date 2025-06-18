import sys
from io import StringIO

def main():
    # Read the submitted code
    with open('solution.py', 'r') as f:
        code = f.read()
    
    # Read the test input
    with open('input.txt', 'r') as f:
        test_input = f.read()
    
    # Create a StringIO object with the test input
    sys.stdin = StringIO(test_input)
    
    try:
        # Execute the code in a clean namespace
        namespace = {}
        exec(code, namespace)
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()






# import sys
# import resource
# import time
# from io import StringIO

# def get_memory_usage():
#     """Get current memory usage in KB"""
#     return resource.getrusage(resource.RUSAGE_SELF).ru_maxrss

# def main():
#     initial_memory = get_memory_usage()
#     start_time = time.time()

#     # Read and execute code
#     # ...existing code...

#     end_time = time.time()
#     final_memory = get_memory_usage()
    
#     # Print metrics
#     print("\n===METRICS===")
#     print(f"time:{(end_time - start_time) * 1000:.2f}")  # Convert to milliseconds
#     print(f"memory:{final_memory - initial_memory}")  # Memory usage in KB

# if __name__ == "__main__":
#     main()