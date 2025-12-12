
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 500))
clock = pygame.time.Clock()

# Initial values
fuel = 80
oxygen = 90

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        if event.type == pygame.KEYDOWN:
            # Left arrow decreases fuel
            if event.key == pygame.K_LEFT:
                fuel = max(0, fuel - 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
            
            # Right arrow increases fuel
            elif event.key == pygame.K_RIGHT:
                fuel = min(100, fuel + 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
            
            # Down arrow decreases oxygen
            elif event.key == pygame.K_DOWN:
                oxygen = max(0, oxygen - 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
            
            # Up arrow increases oxygen
            elif event.key == pygame.K_UP:
                oxygen = min(100, oxygen + 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")
    
    # Clear screen
    screen.fill((0, 0, 0))
    
    # Draw fuel bar (green)
    pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
    
    # Draw oxygen bar (blue)
    pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
    
    # Update display
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
