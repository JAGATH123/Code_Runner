import sys
from io import StringIO

class System:
    def __init__(self, name):
        self.name = name

    def status(self):
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "NavSys:"
            else:
                prefix = "AutoSys:"
        else:
            if name_length % 2 == 0:
                prefix = "Sys:"
            else:
                prefix = "Core:"
        print(f"{prefix} System online")

class NavigationSystem(System):
    def calibrate(self):
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "NavSys:"
            else:
                prefix = "AutoSys:"
        else:
            if name_length % 2 == 0:
                prefix = "Sys:"
            else:
                prefix = "Core:"
        print(f"{prefix} Calibrating star tracker...")

class AutoNav(NavigationSystem):
    def status(self):
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "NavSys:"
            else:
                prefix = "AutoSys:"
        else:
            if name_length % 2 == 0:
                prefix = "Sys:"
            else:
                prefix = "Core:"
        print(f"{prefix} Precision mode enabled")

# Test all 7 cases
test_cases = [
    ("NaviCore", "NavSys: Precision mode enabled\nNavSys: Calibrating star tracker..."),       # len=8, even, >=7
    ("Navigator", "AutoSys: Precision mode enabled\nAutoSys: Calibrating star tracker..."),   # len=9, odd, >=7
    ("Guidance", "NavSys: Precision mode enabled\nNavSys: Calibrating star tracker..."),      # len=8, even, >=7
    ("AutoPilot", "AutoSys: Precision mode enabled\nAutoSys: Calibrating star tracker..."),   # len=9, odd, >=7
    ("NavAI", "Core: Precision mode enabled\nCore: Calibrating star tracker..."),             # len=5, odd, <7
    ("System", "Sys: Precision mode enabled\nSys: Calibrating star tracker..."),              # len=6, even, <7
    ("Star", "Sys: Precision mode enabled\nSys: Calibrating star tracker...")                 # len=4, even, <7
]

for i, (name, expected) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")
    print(f"Expected:\n{expected}")

    # Capture output
    old_stdout = sys.stdout
    sys.stdout = StringIO()

    nav = AutoNav(name)
    nav.status()
    nav.calibrate()

    output = sys.stdout.getvalue().strip()
    sys.stdout = old_stdout

    print(f"Output:\n{output}")
    print(f"Match: {'PASS' if output == expected else 'FAIL'}")
