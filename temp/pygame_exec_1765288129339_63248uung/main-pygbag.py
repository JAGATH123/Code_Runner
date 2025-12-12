
import sys
try:
    import platform
    if platform.system() == 'Emscripten':
        import js
        _orig = sys.stdout
        class Out:
            def write(self, s):
                _orig.write(s)
                if s.strip() and 'pygame' not in s and 'SDL' not in s:
                    try:
                        js.eval(f"window.parent.postMessage({{type:'pygame-console',message:{repr(s.strip())}}}, '*')")
                    except: pass
            def flush(self):
                _orig.flush()
        sys.stdout = Out()
except: pass
import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Complex Pygame Example")

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)

# Game variables
FPS = 60
clock = pygame.time.Clock()
score = 0
game_over = False

# Sound effects (requires sound files, e.g., .wav)
try:
    shoot_sound = pygame.mixer.Sound("shoot.ogg")
    hit_sound = pygame.mixer.Sound("hit.ogg")
    pygame.mixer.music.load("background_music.ogg")
    pygame.mixer.music.play(-1) # Loop music indefinitely
except pygame.error:
    print("Warning: Sound files not found. Running without sound.")
    shoot_sound = None
    hit_sound = None

# Player class
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(BLUE)
        self.rect = self.image.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - 50))
        self.speed = 5

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= self.speed
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed
        
        # Keep player within screen bounds
        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH

    def shoot(self):
        projectile = Projectile(self.rect.centerx, self.rect.top)
        all_sprites.add(projectile)
        projectiles.add(projectile)
        if shoot_sound:
            shoot_sound.play()

# Enemy class
class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 40))
        self.image.fill(RED)
        self.rect = self.image.get_rect(center=(random.randint(20, SCREEN_WIDTH - 20), random.randint(50, 150)))
        self.speed = random.randint(1, 3)

    def update(self):
        self.rect.y += self.speed
        if self.rect.top > SCREEN_HEIGHT:
            self.rect.bottom = 0
            self.rect.x = random.randint(20, SCREEN_WIDTH - 20)
            self.speed = random.randint(1, 3)

# Projectile class
class Projectile(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((10, 20))
        self.image.fill(GREEN)
        self.rect = self.image.get_rect(center=(x, y))
        self.speed = 7

    def update(self):
        self.rect.y -= self.speed
        if self.rect.bottom < 0:
            self.kill() # Remove projectile when it goes off-screen

# Sprite groups
all_sprites = pygame.sprite.Group()
enemies = pygame.sprite.Group()
projectiles = pygame.sprite.Group()

# Create player
player = Player()
all_sprites.add(player)

# Create enemies
for _ in range(5):
    enemy = Enemy()
    all_sprites.add(enemy)
    enemies.add(enemy)

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and not game_over:
                player.shoot()

    if not game_over:
        # Update
        all_sprites.update()

        # Collision detection: Projectiles vs Enemies
        hits = pygame.sprite.groupcollide(projectiles, enemies, True, True)
        for hit in hits:
            score += 10
            if hit_sound:
                hit_sound.play()
            new_enemy = Enemy()
            all_sprites.add(new_enemy)
            enemies.add(new_enemy)

        # Collision detection: Player vs Enemies
        player_hits = pygame.sprite.spritecollide(player, enemies, False)
        if player_hits:
            game_over = True

    # Drawing
    screen.fill(BLACK)
    all_sprites.draw(screen)

    # Display score
    font = pygame.font.Font(None, 36)
    score_text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))

    # Game Over message
    if game_over:
        game_over_font = pygame.font.Font(None, 72)
        game_over_text = game_over_font.render("GAME OVER", True, WHITE)
        text_rect = game_over_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(game_over_text, text_rect)

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()