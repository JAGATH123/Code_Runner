import sys
from io import StringIO

class Spacecraft:
    def __init__(self, name):
        self.name = name

    def launch(self):
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "Advanced:"
            else:
                prefix = "Elite:"
        else:
            if name_length % 2 == 0:
                prefix = "Basic:"
            else:
                prefix = "Swift:"
        print(f"{prefix} {self.name} Launching into space!")

class Satellite(Spacecraft):
    def transmit(self):
        name_length = len(self.name)
        if name_length >= 7:
            if name_length % 2 == 0:
                prefix = "Advanced:"
            else:
                prefix = "Elite:"
        else:
            if name_length % 2 == 0:
                prefix = "Basic:"
            else:
                prefix = "Swift:"
        print(f"{prefix} {self.name} Transmitting data to Earth.")

# Test all 7 cases
test_cases = [
    ("Hubble", "Basic: Hubble Launching into space!\nBasic: Hubble Transmitting data to Earth."),      # len=6, even, <7
    ("GPS", "Swift: GPS Launching into space!\nSwift: GPS Transmitting data to Earth."),              # len=3, odd, <7
    ("Voyager", "Elite: Voyager Launching into space!\nElite: Voyager Transmitting data to Earth."),  # len=7, odd, >=7
    ("Starlink", "Advanced: Starlink Launching into space!\nAdvanced: Starlink Transmitting data to Earth."), # len=8, even, >=7
    ("ISS", "Swift: ISS Launching into space!\nSwift: ISS Transmitting data to Earth."),              # len=3, odd, <7
    ("Intelsat", "Advanced: Intelsat Launching into space!\nAdvanced: Intelsat Transmitting data to Earth."), # len=8, even, >=7
    ("GOES", "Basic: GOES Launching into space!\nBasic: GOES Transmitting data to Earth.")            # len=4, even, <7
]

for i, (name, expected) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")
    print(f"Expected:\n{expected}")

    # Capture output
    old_stdout = sys.stdout
    sys.stdout = StringIO()

    satellite = Satellite(name)
    satellite.launch()
    satellite.transmit()

    output = sys.stdout.getvalue().strip()
    sys.stdout = old_stdout

    print(f"Output:\n{output}")
    print(f"Match: {'PASS' if output == expected else 'FAIL'}")
