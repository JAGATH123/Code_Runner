
import sys
import platform

# Check if running in browser (Pygbag/Emscripten)
IS_BROWSER = platform.system() == 'Emscripten'

class JSConsoleWriter:
    """Custom writer that forwards Python print() to JavaScript parent window"""
    def __init__(self, original_stdout):
        self.original_stdout = original_stdout

    def write(self, text):
        # Write to original stdout (Pygbag terminal)
        self.original_stdout.write(text)

        # Forward to parent window via JavaScript (only in browser)
        if IS_BROWSER and text and text.strip():
            try:
                # Filter out pygame system messages
                clean_text = text.strip()
                if not any(skip in clean_text for skip in ['pygame', 'SDL', 'Hello from', 'community']):
                    # Send to parent window using Pygbag's JavaScript bridge
                    import js
                    message = js.Object.new()
                    message.type = 'pygame-console'
                    message.message = clean_text
                    js.window.parent.postMessage(message, '*')
            except Exception as e:
                # Silently fail if js module not available
                pass

    def flush(self):
        if hasattr(self.original_stdout, 'flush'):
            self.original_stdout.flush()

# Install stdout interceptor
_original_stdout = sys.stdout
sys.stdout = JSConsoleWriter(_original_stdout)

import pygame

pygame.init()
screen = pygame.display.set_mode((800, 500))
clock = pygame.time.Clock()

font = pygame.font.Font(None, 36)

fuel = 80
oxygen = 90

print("===GAME STARTED===")
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
    
    screen.fill((0, 0, 0))
    
    fuel_text = font.render(f"Fuel: {fuel}", True, (0, 255, 0))
    oxygen_text = font.render(f"Oxygen: {oxygen}", True, (0, 0, 255))
    
    screen.blit(fuel_text, (50, 20))
    screen.blit(oxygen_text, (50, 60))
    
    pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
    pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()

