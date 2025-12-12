
import sys
import json
import io
from contextlib import redirect_stdout, redirect_stderr

# User's code (will be defined as a string and executed)
user_code = """# Write your code here\nimport pygame\n\npygame.init()\nscreen = pygame.display.set_mode((800, 500))\nfuel = 80\noxygen = 90\nscreen.fill((0, 0, 0))\npygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))\npygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))\npygame.display.update()\nprint(\"Visual indicators drawn\")"""

# Test cases
test_cases = [{"input":"","expected":"Visual indicators drawn"},{"input":"","expected":"Visual indicators drawn"},{"input":"","expected":"Visual indicators drawn"},{"input":"","expected":"Visual indicators drawn"},{"input":"","expected":"Visual indicators drawn"},{"input":"","expected":"Visual indicators drawn"},{"input":"","expected":"Visual indicators drawn"}]

# Helper to unescape strings (convert \n to actual newlines)
def unescape_string(s):
    return s.encode().decode('unicode_escape')

results = []

for idx, test_case in enumerate(test_cases):
    try:
        # Create a fresh namespace for each test case
        namespace = {}

        # Reset random seed before each test case for reproducibility
        import random as _random_module
        _random_module.seed(42)

        # Redirect stdin to provide input (unescape to get actual newlines)
        original_stdin = sys.stdin
        sys.stdin = io.StringIO(unescape_string(test_case['input']))

        # Capture stdout
        output_buffer = io.StringIO()
        error_buffer = io.StringIO()

        try:
            with redirect_stdout(output_buffer), redirect_stderr(error_buffer):
                exec(user_code, namespace)

            actual_output = output_buffer.getvalue()
            error_output = error_buffer.getvalue()

            if error_output:
                results.append({
                    'index': idx,
                    'passed': False,
                    'actual': actual_output,
                    'error': error_output,
                    'status': 'Error'
                })
            else:
                results.append({
                    'index': idx,
                    'passed': None,  # Will be checked by backend
                    'actual': actual_output,
                    'error': None,
                    'status': 'Success'
                })

        finally:
            sys.stdin = original_stdin
            output_buffer.close()
            error_buffer.close()

    except Exception as e:
        results.append({
            'index': idx,
            'passed': False,
            'actual': '',
            'error': str(e),
            'status': 'Error'
        })
        # Continue to next test case instead of breaking
        # This allows us to see all failures

# Output results as JSON (one line for easy parsing)
print('[BATCH_RESULTS]' + json.dumps(results))
