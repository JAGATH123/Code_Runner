import pygame

# Initialize Pygame
pygame.init()

# Set up the game window
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("My Simple Pygame Window")

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the background with a color (optional)
    screen.fill((255, 255, 255))  # White background

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()