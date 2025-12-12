
import sys
import platform

if platform.system() == 'Emscripten':
    try:
        import js
        _original_stdout = sys.stdout

        class ConsoleWriter:
            def write(self, text):
                _original_stdout.write(text)
                if text and text.strip():
                    t = text.strip()
                    if 'pygame' not in t and 'SDL' not in t:
                        try:
                            msg = js.Object.new()
                            msg.type = 'pygame-console'
                            msg.message = t
                            js.window.parent.postMessage(msg, '*')
                        except:
                            pass

            def flush(self):
                _original_stdout.flush()

        sys.stdout = ConsoleWriter()
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

