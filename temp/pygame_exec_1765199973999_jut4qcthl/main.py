import pygame

pygame.init()
screen = pygame.display.set_mode((800, 500))
screen.fill((0, 0, 0))

# Draw fuel bar (green)
pygame.draw.rect(screen, (0, 255, 0), (50, 450, 160, 20))

# Draw oxygen bar (blue)
pygame.draw.rect(screen, (0, 0, 255), (50, 480, 180, 20))

pygame.display.update()

print("Visual indicators drawn")