
import sys
import platform

# Detect if running in browser
IS_BROWSER = platform.system() == 'Emscripten'

# Import js module at top level for browser environment
if IS_BROWSER:
    try:
        import js
        HAS_JS = True
    except ImportError:
        HAS_JS = False
else:
    HAS_JS = False

class JSConsoleWriter:
    def __init__(self, original_stdout):
        self.original_stdout = original_stdout

    def write(self, text):
        # Always write to original stdout
        self.original_stdout.write(text)
        self.original_stdout.flush()

        # Forward to JavaScript parent window if in browser
        if HAS_JS and text and text.strip():
            try:
                clean_text = text.strip()
                # Filter out Pygame system messages
                skip_messages = ['pygame', 'SDL', 'Hello from', 'community']
                if not any(skip in clean_text for skip in skip_messages):
                    # Use js.eval() to execute JavaScript directly - this works reliably in Pygbag
                    # Escape special characters for JavaScript string
                    escaped_text = clean_text.replace('\', '\\').replace("'", "\'").replace('"', '\"').replace('
', '\n')
                    js.eval(f"window.parent.postMessage({{type: 'pygame-console', message: '{escaped_text}'}}, '*')")
            except Exception:
                # Silently ignore errors
                pass

    def flush(self):
        self.original_stdout.flush()

# Replace stdout with our interceptor
sys.stdout = JSConsoleWriter(sys.stdout)

import pygame
import sys

pygame.init()

screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Fuel & Oxygen Control")

clock = pygame.time.Clock()
font = pygame.font.Font(None, 40)

fuel = 80
oxygen = 90

print(f"Fuel: {fuel}, Oxygen: {oxygen}")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                fuel = max(0, fuel - 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
            elif event.key == pygame.K_RIGHT:
                fuel = min(100, fuel + 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
            elif event.key == pygame.K_DOWN:
                oxygen = max(0, oxygen - 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
            elif event.key == pygame.K_UP:
                oxygen = min(100, oxygen + 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
    
    # Dark gray background so you can see the canvas
    screen.fill((50, 50, 50))
    
    # Large text
    fuel_text = font.render(f"FUEL: {fuel}", True, (0, 255, 0))
    oxygen_text = font.render(f"OXYGEN: {oxygen}", True, (100, 200, 255))
    
    screen.blit(fuel_text, (50, 50))
    screen.blit(oxygen_text, (50, 120))
    
    # Large bars
    pygame.draw.rect(screen, (0, 255, 0), (50, 200, fuel * 4, 40))
    pygame.draw.rect(screen, (100, 200, 255), (50, 260, oxygen * 4, 40))
    
    pygame.display.flip()
    clock.tick(30)

pygame.quit()
sys.exit()
