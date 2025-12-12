import pygame

pygame.init()
screen = pygame.display.set_mode((400, 300))
clock = pygame.time.Clock()
font = pygame.font.Font(None, 30)

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
    
    screen.fill((20, 20, 20))
    
    fuel_text = font.render(f"FUEL: {fuel}%", True, (0, 255, 0))
    oxygen_text = font.render(f"OXYGEN: {oxygen}%", True, (100, 200, 255))
    screen.blit(fuel_text, (20, 20))
    screen.blit(oxygen_text, (20, 60))
    
    pygame.draw.rect(screen, (0, 255, 0), (20, 120, fuel * 3, 25))
    pygame.draw.rect(screen, (100, 200, 255), (20, 160, oxygen * 3, 25))
    
    pygame.display.flip()
    clock.tick(30)

pygame.quit()
