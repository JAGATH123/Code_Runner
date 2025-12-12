# Write your code here
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 500))
clock = pygame.time.Clock()

# Initialize font for text rendering
font = pygame.font.Font(None, 36)

# Initial values
fuel = 80
oxygen = 90

# Print initial values immediately
print(f"Game started! Fuel: {fuel}, Oxygen: {oxygen}")

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
    
    # Render text labels
    fuel_text = font.render(f"Fuel: {fuel}", True, (0, 255, 0))
    oxygen_text = font.render(f"Oxygen: {oxygen}", True, (0, 0, 255))
    
    # Display text at the top
    screen.blit(fuel_text, (50, 20))      # Fuel text at top
    screen.blit(oxygen_text, (50, 60))    # Oxygen text below fuel
    
    # Draw fuel bar (green) - lower on screen
    pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
    
    # Draw oxygen bar (blue) - at bottom
    pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
    
    # Update display
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
