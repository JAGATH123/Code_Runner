import pygame
pygame.init()

# Window
screen = pygame.display.set_mode((500, 300))
pygame.display.set_caption("Fuel & Oxygen Control")

# Values
fuel = 80
oxygen = 90

clock = pygame.time.Clock()
running = True

# Colors
WHITE = (255,255,255)
GREEN = (0,200,0)
RED = (200,0,0)
BLUE = (0,0,200)
BLACK = (0,0,0)

while running:
    screen.fill(WHITE)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                fuel = max(0, fuel - 10)
            if event.key == pygame.K_RIGHT:
                fuel = min(100, fuel + 10)
            if event.key == pygame.K_DOWN:
                oxygen = max(0, oxygen - 10)
            if event.key == pygame.K_UP:
                oxygen = min(100, oxygen + 10)

            print(f"Fuel: {fuel}, Oxygen: {oxygen}")

    # ---------------------------
    # DRAW BARS (THIS MAKES THEM VISIBLE)
    # ---------------------------

    # Fuel bar outline
    pygame.draw.rect(screen, BLACK, (50, 50, 200, 25), 2)
    # Fuel bar fill
    pygame.draw.rect(screen, RED, (50, 50, 2 * fuel, 25))

    # Oxygen bar outline
    pygame.draw.rect(screen, BLACK, (50, 120, 200, 25), 2)
    # Oxygen bar fill
    pygame.draw.rect(screen, BLUE, (50, 120, 2 * oxygen, 25))

    # Labels
    font = pygame.font.SysFont(None, 30)
    f_text = font.render(f"Fuel: {fuel}", True, BLACK)
    o_text = font.render(f"Oxygen: {oxygen}", True, BLACK)

    screen.blit(f_text, (270, 50))
    screen.blit(o_text, (270, 120))

    pygame.display.update()
    clock.tick(30)

pygame.quit()
