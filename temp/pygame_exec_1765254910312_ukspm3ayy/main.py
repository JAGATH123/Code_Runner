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

# Print completion message
print("Visual indicators drawn")

# Game loop with limited duration (works in both Pygbag and container)
async def main():
    clock = pygame.time.Clock()
    frames = 0
    max_frames = 180  # Run for 3 seconds at 60 FPS
    
    while frames < max_frames:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return
        
        # Fill background with black
        screen.fill((0, 0, 0))
        
        # Draw fuel bar
        # Position: (50, 450), Green color: (0, 255, 0), Width: fuel * 2, Height: 20
        pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
        
        # Draw oxygen bar
        # Position: (50, 480), Blue color: (0, 0, 255), Width: oxygen * 2, Height: 20
        pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
        
        # Update display
        pygame.display.flip()
        
        # Yield control back to browser (required for Pygbag)
        await asyncio.sleep(0)
        
        clock.tick(60)
        frames += 1

# Run the async main loop
asyncio.run(main())

pygame.quit()