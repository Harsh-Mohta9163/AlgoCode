import sys
import resource
import time

def set_limits():
    # 1GB memory limit
    memory_limit = 1024 * 1024 * 1024
    resource.setrlimit(resource.RLIMIT_AS, (memory_limit, memory_limit))
    
    # 2 second CPU time limit
    cpu_limit = 2
    resource.setrlimit(resource.RLIMIT_CPU, (cpu_limit, cpu_limit))

def main():
    set_limits()
    
    # Read code and input
    with open('solution.py', 'r') as f:
        code = f.read()
    
    with open('input.txt', 'r') as f:
        sys.stdin = f
    
    start_time = time.time()
    
    try:
        exec(code)
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)
    
    end_time = time.time()
    execution_time = (end_time - start_time) * 1000
    memory_used = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    
    print(f"\n===METRICS===")
    print(f"time:{execution_time:.2f}")
    print(f"memory:{memory_used}")

if __name__ == "__main__":
    main()