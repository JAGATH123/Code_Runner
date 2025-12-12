
import sys
import platform

# Check if running in browser (Emscripten/Pygbag environment)
if platform.system() == 'Emscripten':
    try:
        import js

        class BrowserConsole:
            def __init__(self, original):
                self.original = original

            def write(self, text):
                self.original.write(text)
                self.original.flush()

                if text and text.strip():
                    clean = text.strip()
                    # Filter out pygame system messages
                    if not any(x in clean for x in ['pygame', 'SDL', 'Hello from']):
                        try:
                            # Send to parent window
                            js.eval(f'''
                                window.parent.postMessage({{
                                    type: 'pygame-console',
                                    message: {repr(clean)}
                                }}, '*');
                            ''')
                        except:
                            pass

            def flush(self):
                self.original.flush()

        sys.stdout = BrowserConsole(sys.stdout)
    except:
        pass

import pygame

# Initialize Pygame
pygame.init()

# Create window
screen = pygame.display.set_mode((500, 300))
pygame.display.set_caption("Fuel & Oxygen Control Panel")

# Starting values
fuel = 80
oxygen = 90

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Detect key presses
        if event.type == pygame.KEYDOWN:

            # Fuel controls
            if event.key == pygame.K_LEFT:
                fuel = max(0, fuel - 10)
            if event.key == pygame.K_RIGHT:
                fuel = min(100, fuel + 10)

            # Oxygen controls
            if event.key == pygame.K_DOWN:
                oxygen = max(0, oxygen - 10)
            if event.key == pygame.K_UP:
                oxygen = min(100, oxygen + 10)

            # Print updated values
            print(f"Fuel: {fuel}, Oxygen: {oxygen}")

    # Fill background
    screen.fill((30, 30, 30))

    # Update window
    pygame.display.update()

pygame.quit()
