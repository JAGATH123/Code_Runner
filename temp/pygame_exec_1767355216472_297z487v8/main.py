
import sys
_original_init = None
_interceptor_active = False

try:
    import platform
    if platform.system() == 'Emscripten':
        import pygame
        import js

        _orig_stdout = sys.stdout
        _printed_messages = set()

        class Out:
            def write(self, s):
                global _printed_messages
                _orig_stdout.write(s)
                if _interceptor_active and s.strip():
                    text = s.strip()

                    # Filter system/debug messages
                    skip_keywords = ['pygame', 'SDL', '__call__', 'coroutine', 'object at 0x',
                                   '.call', 'fire_event', 'patch_', 'asyncio']
                    if any(kw in text for kw in skip_keywords):
                        return

                    # Filter single characters or just numbers
                    if len(text) <= 2 or text.isdigit():
                        return

                    # Block duplicate messages - only allow each unique message once
                    if text in _printed_messages:
                        return

                    _printed_messages.add(text)
                    try:
                        js.eval(f"window.parent.postMessage({{type:'pygame-console',message:{repr(text)}}}, '*')")
                        _orig_stdout.flush()  # Force flush to ensure message is sent
                    except: pass
            def flush(self):
                _orig_stdout.flush()

        # Activate interceptor after pygame.init()
        _original_init = pygame.init
        def _patched_init():
            global _interceptor_active
            result = _original_init()
            _interceptor_active = True
            sys.stdout = Out()
            return result
        pygame.init = _patched_init
except: pass
import asyncio
import pygame
import random

pygame.init()
screen = pygame.display.set_mode((400, 300))

CHANGE_COLOR = pygame.USEREVENT + 1
pygame.time.set_timer(CHANGE_COLOR, 1000)

color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

print("Auto color change active")

running = True

while running:
    await asyncio.sleep(0)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == CHANGE_COLOR:
            color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    
    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, color, (150, 100, 100, 100))
    
    pygame.display.flip()
    await asyncio.sleep(0)

