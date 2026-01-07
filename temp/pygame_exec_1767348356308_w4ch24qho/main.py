
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
screen = pygame.display.set_mode((800, 500))

fuel = 80
oxygen = 90

pygame.draw.rect(screen, (0, 255, 0), (50, 450, fuel * 2, 20))
pygame.draw.rect(screen, (0, 0, 255), (50, 480, oxygen * 2, 20))

print("Visual indicators drawn")