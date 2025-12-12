
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
import sys

pygame.init()
screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Fuel & Oxygen Control")
clock = pygame.time.Clock()

fuel = 80
oxygen = 90

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
    
    # Simple display
    screen.fill((50, 50, 50))
    pygame.display.flip()
    clock.tick(30)

pygame.quit()
sys.exit()
