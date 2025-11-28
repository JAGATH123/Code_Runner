class Spacecraft:
    def __init__(self, name):
        self.name = name

    def launch(self):
        # Determine prefix based on name length
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "Advanced:"
            else:
                prefix = "Elite:"
        else:  # name_length < 7
            if name_length % 2 == 0:
                prefix = "Basic:"
            else:
                prefix = "Swift:"
        print(f"{prefix} {self.name} Launching into space!")

class Satellite(Spacecraft):  # Inherits from Spacecraft
    def transmit(self):
        # Determine prefix based on name length (same logic as parent)
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "Advanced:"
            else:
                prefix = "Elite:"
        else:  # name_length < 7
            if name_length % 2 == 0:
                prefix = "Basic:"
            else:
                prefix = "Swift:"
        print(f"{prefix} {self.name} Transmitting data to Earth.")

# Test all cases
test_cases = [
    "Hubble",    # len=6, even, <7 → Basic:
    "GPS",       # len=3, odd, <7 → Swift:
    "Voyager",   # len=7, odd, >=7 → Elite:
    "Starlink",  # len=8, even, >=7 → Advanced:
    "ISS"        # len=3, odd, <7 → Swift:
]

expected_outputs = [
    "Basic: Hubble Launching into space!\nBasic: Hubble Transmitting data to Earth.",
    "Swift: GPS Launching into space!\nSwift: GPS Transmitting data to Earth.",
    "Elite: Voyager Launching into space!\nElite: Voyager Transmitting data to Earth.",
    "Advanced: Starlink Launching into space!\nAdvanced: Starlink Transmitting data to Earth.",
    "Swift: ISS Launching into space!\nSwift: ISS Transmitting data to Earth."
]

for i, (name, expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")

    # Capture output
    import io
    import sys

    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()

    # Create Satellite object and call both methods
    satellite = Satellite(name)
    satellite.launch()      # Inherited method
    satellite.transmit()    # New method

    # Get output
    sys.stdout = old_stdout
    result = buffer.getvalue().strip()

    print(f"Expected:\n{expected}")
    print(f"Output:\n{result}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
