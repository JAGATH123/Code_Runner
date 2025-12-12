# Write your code here
import pygame
import asyncio

# Initialize pygame
pygame.init()

# Create window (800x500)
screen = pygame.display.set_mode((800, 500))
pygame.display.set_caption("Visual Indicators")

# Set initial values
fuel = 80
oxygen = 90

# Print completion message (required for test cases)
print("Visual indicators drawn")

# Game loop (required for Pygbag)
async def main():
    clock = pygame.time.Clock()
    running = True
    
    while running:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        # Fill background with black
        screen.fill((0, 0, 0))
        
        # Draw fuel bar
        pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
        
        # Draw oxygen bar
        pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
        
        # Update display
        pygame.display.flip()
        
        # Yield control to browser (required for Pygbag)
        await asyncio.sleep(0)
        
        clock.tick(60)

# Run the async main loop
asyncio.run(main())

pygame.quit()