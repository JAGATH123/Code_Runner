
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

The black screen issue might be because the screen size or rendering isn't working properly. Let me give you a simpler, more robust code that will definitely show the bars:
import pygame
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH = 600
HEIGHT = 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Resource Management")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BLUE = (0, 100, 255)

# Font
font = pygame.font.Font(None, 36)

# Initial values
fuel = 80
oxygen = 90

# Print initial state
print("Game started!")
print(f"Fuel: {fuel}, Oxygen: {oxygen}")

# Game loop
clock = pygame.time.Clock()
running = True

while running:
    # Handle events
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
    
    # Clear screen
    screen.fill(BLACK)
    
    # Draw fuel bar (green)
    fuel_bar_width = int((fuel / 100) * 300)
    pygame.draw.rect(screen, GREEN, (50, 150, fuel_bar_width, 40))
    pygame.draw.rect(screen, WHITE, (50, 150, 300, 40), 2)  # Border
    
    # Draw oxygen bar (blue)
    oxygen_bar_width = int((oxygen / 100) * 300)
    pygame.draw.rect(screen, BLUE, (50, 250, oxygen_bar_width, 40))
    pygame.draw.rect(screen, WHITE, (50, 250, 300, 40), 2)  # Border
    
    # Draw text labels
    fuel_text = font.render(f"Fuel: {fuel}%", True, WHITE)
    oxygen_text = font.render(f"Oxygen: {oxygen}%", True, WHITE)
    screen.blit(fuel_text, (360, 160))
    screen.blit(oxygen_text, (360, 260))
    
    # Update display
    pygame.display.flip()
    clock.tick(30)

# Quit
pygame.quit()
sys.exit()