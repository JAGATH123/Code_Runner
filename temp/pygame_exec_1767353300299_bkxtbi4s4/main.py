
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

pygame.init()
screen = pygame.display.set_mode((900, 600))
pygame.display.set_caption("Mission Dashboard")

systems = {
    "Power": 80,
    "Cooling": 70,
    "Data Bus": 90,
    "Security Gate": 60,
    "AI Core": 85
}

star_x = 0
font = pygame.font.Font(None, 24)

print("Dashboard initialized")
print("Status bars rendered")
print("Animation active")

if all(value > 60 for value in systems.values()):
    print("Status: OPTIMAL")
elif any(value < 30 for value in systems.values()):
    print("Status: CRITICAL")
else:
    print("Status: WARNING")

running = True

while running:
    await asyncio.sleep(0)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                for key in systems:
                    systems[key] = min(100, systems[key] + 5)
            elif event.key == pygame.K_DOWN:
                for key in systems:
                    systems[key] = max(0, systems[key] - 5)
            elif event.key == pygame.K_LEFT:
                systems["Power"] = max(0, systems["Power"] - 5)
            elif event.key == pygame.K_RIGHT:
                systems["Power"] = min(100, systems["Power"] + 5)
    
    screen.fill((10, 10, 40))
    
    y_position = 100
    for name, value in systems.items():
        if value > 70:
            color = (0, 255, 0)
        elif value >= 40:
            color = (255, 165, 0)
        else:
            color = (255, 0, 0)
        
        pygame.draw.rect(screen, color, (50, y_position, value * 2, 25))
        label = font.render(f"{name}: {value}", True, (255, 255, 255))
        screen.blit(label, (300, y_position))
        y_position += 40
    
    pygame.draw.circle(screen, (255, 255, 255), (star_x, 50), 3)
    star_x += 5
    if star_x > 900:
        star_x = 0
    
    if all(value > 60 for value in systems.values()):
        status_text = "OPTIMAL"
    elif any(value < 30 for value in systems.values()):
        status_text = "CRITICAL"
    else:
        status_text = "WARNING"
    
    status = font.render(f"Status: {status_text}", True, (255, 255, 255))
    screen.blit(status, (50, 550))
    
    pygame.display.flip()
    await asyncio.sleep(0)

