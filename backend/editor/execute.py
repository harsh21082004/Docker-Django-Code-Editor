import subprocess
import tempfile
import os

def run_code(code, language='python'):
    if language != 'python':
        return "", "Only Python is supported right now."

    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp:
        temp.write(code)
        temp_filename = temp.name

    try:
        result = subprocess.run(['python', temp_filename], capture_output=True, text=True, timeout=5)
        return result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return "", "Execution timed out."
    finally:
        os.remove(temp_filename)
