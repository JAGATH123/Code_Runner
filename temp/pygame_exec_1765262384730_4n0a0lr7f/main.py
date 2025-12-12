# Write your code here
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 500))
fuel = 80
oxygen = 90
screen.fill((0, 0, 0))
pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))
pygame.display.update()
print("Visual indicators drawn")