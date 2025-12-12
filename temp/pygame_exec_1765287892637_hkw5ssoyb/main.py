
import sys
try:
    import platform
    if platform.system() == 'Emscripten':
        import js
        _orig = sys.stdout
        class Out:
            def write(self, s):
                _orig.write(s)
                if s.strip() and 'pygame' not in s and 'SDL' not in s:
                    try:
                        js.eval(f"window.parent.postMessage({{type:'pygame-console',message:{repr(s.strip())}}}, '*')")
                    except: pass
            def flush(self):
                _orig.flush()
        sys.stdout = Out()
except: pass
import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((600, 600))
pygame.display.set_caption("Dynamic Display Refresh")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 30)

# Initial values
fuel = 80
oxygen = 90

print("Dynamic display active")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                fuel = max(0, fuel - 10)
            elif event.key == pygame.K_RIGHT:
                fuel = min(100, fuel + 10)
            elif event.key == pygame.K_DOWN:
                oxygen = max(0, oxygen - 10)
            elif event.key == pygame.K_UP:
                oxygen = min(100, oxygen + 10)
    
    # Clear screen
    screen.fill((50, 50, 50))
    
    # Draw text labels
    fuel_label = font.render("Fuel:", True, (255, 255, 255))
    oxygen_label = font.render("Oxygen:", True, (255, 255, 255))
    
    screen.blit(fuel_label, (10, 450))
    screen.blit(oxygen_label, (10, 480))
    
    # Fuel bar - red if < 30, green otherwise
    if fuel < 30:
        fuel_color = (255, 0, 0)  # Red
    else:
        fuel_color = (0, 255, 0)  # Green
    
    # Oxygen bar - orange if < 40, blue otherwise
    if oxygen < 40:
        oxygen_color = (255, 165, 0)  # Orange
    else:
        oxygen_color = (0, 0, 255)  # Blue
    
    # Draw bars
    pygame.draw.rect(screen, fuel_color, (50, 450, fuel * 4, 20))
    pygame.draw.rect(screen, oxygen_color, (50, 480, oxygen * 4, 20))
    
    pygame.display.flip()
    clock.tick(30)

pygame.quit()
sys.exit()
