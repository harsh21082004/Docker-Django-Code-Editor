from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import subprocess
import tempfile
from .execute import run_code


def run_code_with_input(code, input_data):
    try:
        # Write the user code to a temp file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp:
            temp.write(code)
            temp_path = temp.name

        # Run the Python script with input_data piped into stdin
        process = subprocess.run(
            ['python', temp_path],
            input=input_data.encode(),  # encode input string to bytes
            capture_output=True,
            timeout=5  # prevent infinite loops, adjust as needed
        )

        # Get stdout and stderr
        output = process.stdout.decode()
        errors = process.stderr.decode()

        if errors:
            return {'error': errors}
        else:
            return {'output': output}

    except subprocess.TimeoutExpired:
        return {'error': 'Execution timed out'}
    except Exception as e:
        return {'error': str(e)}


@csrf_exempt
def execute_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code', '')
            input_data = data.get('input', '')

            result = run_code_with_input(code, input_data)

            return JsonResponse(result)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)
