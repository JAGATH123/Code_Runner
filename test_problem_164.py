class Vehicle:
    def __init__(self, name):
        self.name = name

    def move(self):
        # Determine prefix based on name length
        name_length = len(self.name)
        if name_length >= 8:
            if name_length % 2 == 0:
                prefix = "Heavy:"
            else:
                prefix = "Super:"
        else:  # name_length < 8
            if name_length % 2 == 0:
                prefix = "Fast:"
            else:
                prefix = "Quick:"
        print(f"{prefix} {self.name} Moving...")

class Rocket(Vehicle):  # Inherits from Vehicle
    def ignite(self):
        # Determine prefix based on name length
        name_length = len(self.name)
        if name_length >= 8:
            if name_length % 2 == 0:
                prefix = "Heavy:"
            else:
                prefix = "Super:"
        else:  # name_length < 8
            if name_length % 2 == 0:
                prefix = "Fast:"
            else:
                prefix = "Quick:"
        print(f"{prefix} {self.name} Rocket engines firing!")

class CargoRocket(Rocket):  # Inherits from Rocket (which inherits from Vehicle)
    def deliver(self):
        # Determine prefix based on name length
        name_length = len(self.name)
        if name_length >= 8:
            if name_length % 2 == 0:
                prefix = "Heavy:"
            else:
                prefix = "Super:"
        else:  # name_length < 8
            if name_length % 2 == 0:
                prefix = "Fast:"
            else:
                prefix = "Quick:"
        print(f"{prefix} {self.name} Delivering satellite payload.")

# Test all cases
test_cases = [
    "Starship",   # len=8, even, >=8 → Heavy:
    "Discovery",  # len=9, odd, >=8 → Super:
    "Soyuz",      # len=5, odd, <8 → Quick:
    "Falcon",     # len=6, even, <8 → Fast:
    "SaturnV"     # len=7, odd, <8 → Quick:
]

expected_outputs = [
    "Heavy: Starship Moving...\nHeavy: Starship Rocket engines firing!\nHeavy: Starship Delivering satellite payload.",
    "Super: Discovery Moving...\nSuper: Discovery Rocket engines firing!\nSuper: Discovery Delivering satellite payload.",
    "Quick: Soyuz Moving...\nQuick: Soyuz Rocket engines firing!\nQuick: Soyuz Delivering satellite payload.",
    "Fast: Falcon Moving...\nFast: Falcon Rocket engines firing!\nFast: Falcon Delivering satellite payload.",
    "Quick: SaturnV Moving...\nQuick: SaturnV Rocket engines firing!\nQuick: SaturnV Delivering satellite payload."
]

for i, (name, expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")

    # Capture output
    import io
    import sys

    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()

    # Create CargoRocket object and call all three methods
    cargo = CargoRocket(name)
    cargo.move()      # From Vehicle (grandparent)
    cargo.ignite()    # From Rocket (parent)
    cargo.deliver()   # From CargoRocket (current class)

    # Get output
    sys.stdout = old_stdout
    result = buffer.getvalue().strip()

    print(f"Expected:\n{expected}")
    print(f"Output:\n{result}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
