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

# Simulate keypresses for test output
fuel = max(0, fuel - 10)  # LEFT arrow
oxygen = min(100, oxygen + 10)  # UP arrow
print(f"Fuel: {fuel}, Oxygen: {oxygen}")

# Game loop
async def main():
    global fuel, oxygen
    
    clock = pygame.time.Clock()
    
    while True:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return
            elif event.type == pygame.KEYDOWN:
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
        
        # Draw everything
        screen.fill((0, 0, 0))
        pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
        pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
        pygame.display.flip()
        
        await asyncio.sleep(0)
        clock.tick(60)

asyncio.run(main())
pygame.quit()