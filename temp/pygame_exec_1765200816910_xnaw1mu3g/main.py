import pygame
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("My Pygame Window")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Game loop
running = True
while running:
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:  # User clicked the close button
            running = False
        # Add more event handling here (e.g., keyboard presses, mouse clicks)
        # if event.type == pygame.KEYDOWN:
        #     if event.key == pygame.K_SPACE:
        #         print("Spacebar pressed!")

    # Game logic (update game state)
    # This is where you would update positions, check collisions, etc.

    # Drawing (render elements to the screen)
    SCREEN.fill(WHITE)  # Fill the background
    pygame.draw.rect(SCREEN, RED, (50, 50, 100, 100)) # Draw a red rectangle

    # Update the display
    pygame.display.flip()  # Or pygame.display.update() for partial updates

# Quit Pygame
pygame.quit()
sys.exit()