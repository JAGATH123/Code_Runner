import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Fuel & Oxygen Control")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 40)

fuel = 70
oxygen = 100

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
    
    screen.fill((50, 50, 50))
    
    fuel_text = font.render(f"FUEL: {fuel}", True, (0, 255, 0))
    oxygen_text = font.render(f"OXYGEN: {oxygen}", True, (100, 200, 255))
    
    screen.blit(fuel_text, (50, 50))
    screen.blit(oxygen_text, (50, 120))
    
    pygame.draw.rect(screen, (0, 255, 0), (50, 200, fuel * 4, 40))
    pygame.draw.rect(screen, (100, 200, 255), (50, 260, oxygen * 4, 40))
    
    pygame.display.flip()
    clock.tick(30)

pygame.quit()
sys.exit()
