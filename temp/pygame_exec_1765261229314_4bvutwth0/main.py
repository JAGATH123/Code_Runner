import asyncio
import pygame

async def main():
    # Write your code here
    
    pygame.init()
    screen = pygame.display.set_mode((800, 500))
    
    # Set initial values
    fuel = 80
    oxygen = 90
    
    # Fill background
    screen.fill((0, 0, 0))
    
    # Draw fuel bar (green)
    pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
    
    # Draw oxygen bar (blue)
    pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
    
    # Update display
    pygame.display.update()
    
    print("Visual indicators drawn")

    # Keep window open for Pygbag
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        await asyncio.sleep(0)

asyncio.run(main())
