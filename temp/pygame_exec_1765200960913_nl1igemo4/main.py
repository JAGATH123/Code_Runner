# Write your code here
import pygame

# Initialize pygame
pygame.init()

# Create window (800x500)
screen = pygame.display.set_mode((800, 500))
pygame.display.set_caption("Visual Indicators")

# Set initial values
fuel = 80
oxygen = 90

# Fill background with black
screen.fill((0, 0, 0))

# Draw fuel bar
# Position: (50, 450), Green color: (0, 255, 0), Width: fuel * 2, Height: 20
pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))

# Draw oxygen bar
# Position: (50, 480), Blue color: (0, 0, 255), Width: oxygen * 2, Height: 20
pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))

# Update display
pygame.display.update()

# Print completion message
print("Visual indicators drawn")

# Keep window open briefly (for headless mode)
pygame.time.wait(100)
pygame.quit()