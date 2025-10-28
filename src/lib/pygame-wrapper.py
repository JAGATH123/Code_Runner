"""
Pygame wrapper for headless execution in Code Runner
This can be prepended to student pygame code
"""
import pygame
import os
import sys

# Check if running in headless mode
IS_HEADLESS = os.environ.get('SDL_VIDEODRIVER') == 'dummy'

if IS_HEADLESS:
    print("Running in headless mode - pygame will render and save output")

    # Monkey-patch the event loop to auto-exit after rendering
    original_flip = pygame.display.flip
    original_update = pygame.display.update

    frame_count = 0
    MAX_FRAMES = 120  # Default max frames in headless mode

    def headless_flip():
        global frame_count
        result = original_flip()
        frame_count += 1

        # Save screenshot every 30 frames or at the end
        if frame_count % 30 == 0 or frame_count >= MAX_FRAMES:
            screen = pygame.display.get_surface()
            if screen:
                filename = f"/tmp/plots/pygame_frame_{frame_count:04d}.png"
                pygame.image.save(screen, filename)
                print(f"Saved frame {frame_count} to {filename}")

        # Auto-exit after max frames
        if frame_count >= MAX_FRAMES:
            print(f"Headless mode: Rendered {frame_count} frames, exiting...")
            pygame.quit()
            sys.exit(0)

        return result

    pygame.display.flip = headless_flip
    pygame.display.update = lambda *args, **kwargs: headless_flip()

print("Pygame initialized for Code Runner")
