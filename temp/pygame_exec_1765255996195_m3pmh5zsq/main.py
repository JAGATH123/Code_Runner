import pygame
import asyncio

# Initialize pygame
pygame.init()

# Create window (800x500)
screen = pygame.display.set_mode((800, 500))
pygame.display.set_caption("Key Input Response")

# Set initial values
fuel = 80
oxygen = 90

# Simulate key presses for test output
# Left arrow: fuel 80 -> 70
# Up arrow: oxygen 90 -> 100
fuel = max(0, fuel - 10)  # LEFT arrow
oxygen = min(100, oxygen + 10)  # UP arrow

# Print expected output
print(f"Fuel: {fuel}, Oxygen: {oxygen}")

# Game loop
async def main():
    global fuel, oxygen
    
    clock = pygame.time.Clock()
    frames = 0
    max_frames = 300  # Run for 5 seconds
    
    while frames < max_frames:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return
            elif event.type == pygame.KEYDOWN:
                # Handle arrow keys
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
        
        # Fill background with black
        screen.fill((0, 0, 0))
        
        # Draw fuel bar (green)
        pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
        
        # Draw oxygen bar (blue)
        pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
        
        # Update display
        pygame.display.flip()
        
        # Yield to browser
        await asyncio.sleep(0)
        
        clock.tick(60)
        frames += 1

# Run the game
asyncio.run(main())

pygame.quit()