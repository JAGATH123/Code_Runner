
import sys
import json
import io
from contextlib import redirect_stdout, redirect_stderr

# User's code (will be defined as a string and executed)
user_code = """import pygame\npygame.init()\n\n# Window\nscreen = pygame.display.set_mode((500, 300))\npygame.display.set_caption(\"Fuel & Oxygen Control\")\n\n# Values\nfuel = 80\noxygen = 90\n\nclock = pygame.time.Clock()\nrunning = True\n\n# Colors\nWHITE = (255,255,255)\nGREEN = (0,200,0)\nRED = (200,0,0)\nBLUE = (0,0,200)\nBLACK = (0,0,0)\n\nwhile running:\n    screen.fill(WHITE)\n\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n        \n        if event.type == pygame.KEYDOWN:\n            if event.key == pygame.K_LEFT:\n                fuel = max(0, fuel - 10)\n            if event.key == pygame.K_RIGHT:\n                fuel = min(100, fuel + 10)\n            if event.key == pygame.K_DOWN:\n                oxygen = max(0, oxygen - 10)\n            if event.key == pygame.K_UP:\n                oxygen = min(100, oxygen + 10)\n\n            print(f\"Fuel: {fuel}, Oxygen: {oxygen}\")\n\n    # ---------------------------\n    # DRAW BARS (THIS MAKES THEM VISIBLE)\n    # ---------------------------\n\n    # Fuel bar outline\n    pygame.draw.rect(screen, BLACK, (50, 50, 200, 25), 2)\n    # Fuel bar fill\n    pygame.draw.rect(screen, RED, (50, 50, 2 * fuel, 25))\n\n    # Oxygen bar outline\n    pygame.draw.rect(screen, BLACK, (50, 120, 200, 25), 2)\n    # Oxygen bar fill\n    pygame.draw.rect(screen, BLUE, (50, 120, 2 * oxygen, 25))\n\n    # Labels\n    font = pygame.font.SysFont(None, 30)\n    f_text = font.render(f\"Fuel: {fuel}\", True, BLACK)\n    o_text = font.render(f\"Oxygen: {oxygen}\", True, BLACK)\n\n    screen.blit(f_text, (270, 50))\n    screen.blit(o_text, (270, 120))\n\n    pygame.display.update()\n    clock.tick(30)\n\npygame.quit()\n"""

# Test cases
test_cases = [{"input":"","expected":"Fuel: 70, Oxygen: 100"},{"input":"","expected":"Fuel: 70, Oxygen: 100"},{"input":"","expected":"Fuel: 70, Oxygen: 100"},{"input":"","expected":"Fuel: 70, Oxygen: 100"},{"input":"","expected":"Fuel: 70, Oxygen: 100"},{"input":"","expected":"Fuel: 70, Oxygen: 100"},{"input":"","expected":"Fuel: 70, Oxygen: 100"}]

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
