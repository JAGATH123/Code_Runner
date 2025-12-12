import sys
from io import StringIO

class Rover:
    def __init__(self, name):
        self.name = name

    def identify(self):
        name_length = len(self.name)
        if name_length >= 6:
            if name_length % 2 == 0:
                prefix = "Advanced Rover:"
            else:
                prefix = "Elite Rover:"
        else:
            if name_length % 2 == 0:
                prefix = "Base Rover:"
            else:
                prefix = "Swift Rover:"
        print(f"{prefix} Generic Rover")

class MarsRover(Rover):
    def identify(self):
        name_length = len(self.name)
        if name_length >= 6:
            if name_length % 2 == 0:
                prefix = "Advanced Rover:"
            else:
                prefix = "Elite Rover:"
        else:
            if name_length % 2 == 0:
                prefix = "Base Rover:"
            else:
                prefix = "Swift Rover:"
        print(f"{prefix} Mars Exploration Rover")

# Test all 7 cases
test_cases = [
    ("Spirit", "Advanced Rover: Generic Rover\nAdvanced Rover: Mars Exploration Rover"),          # len=6, even, >=6
    ("Opportunity", "Elite Rover: Generic Rover\nElite Rover: Mars Exploration Rover"),          # len=11, odd, >=6
    ("Curiosity", "Elite Rover: Generic Rover\nElite Rover: Mars Exploration Rover"),            # len=9, odd, >=6
    ("Perseverance", "Advanced Rover: Generic Rover\nAdvanced Rover: Mars Exploration Rover"),   # len=12, even, >=6
    ("Sojourner", "Elite Rover: Generic Rover\nElite Rover: Mars Exploration Rover"),            # len=9, odd, >=6
    ("Zhurong", "Elite Rover: Generic Rover\nElite Rover: Mars Exploration Rover"),              # len=7, odd, >=6
    ("Yutu", "Base Rover: Generic Rover\nBase Rover: Mars Exploration Rover")                    # len=4, even, <6
]

for i, (name, expected) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")
    print(f"Expected:\n{expected}")

    # Capture output
    old_stdout = sys.stdout
    sys.stdout = StringIO()

    rover = Rover(name)
    mars_rover = MarsRover(name)
    rover.identify()
    mars_rover.identify()

    output = sys.stdout.getvalue().strip()
    sys.stdout = old_stdout

    print(f"Output:\n{output}")
    print(f"Match: {'PASS' if output == expected else 'FAIL'}")
