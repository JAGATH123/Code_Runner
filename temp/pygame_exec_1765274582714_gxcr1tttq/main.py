# Write your code here
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 500))
clock = pygame.time.Clock()

font = pygame.font.Font(None, 36)

fuel = 70
oxygen = 100

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