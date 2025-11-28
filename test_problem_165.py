class Sensor:
    def __init__(self, name):
        self.name = name

    def record(self, duration=None):
        # Determine prefix based on name length
        name_length = len(self.name)
        if name_length >= 6:
            if name_length % 2 == 0:
                prefix = "Alpha:"
            else:
                prefix = "Beta:"
        else:  # name_length < 6
            if name_length % 2 == 0:
                prefix = "Gamma:"
            else:
                prefix = "Delta:"

        # Print based on whether duration is provided
        if duration is None:
            print(f"{prefix} {self.name} Recording data indefinitely.")
        else:
            print(f"{prefix} {self.name} Recording data for {duration} seconds.")

# Test all cases
test_cases = [
    ("Camera", 10),   # len=6, even, >=6 → Alpha:
    ("Thermal", 10),  # len=7, odd, >=6 → Beta:
    ("Temp", 10),     # len=4, even, <6 → Gamma:
    ("Ion", 10),      # len=3, odd, <6 → Delta:
    ("Gyro", 10)      # len=4, even, <6 → Gamma:
]

expected_outputs = [
    "Alpha: Camera Recording data indefinitely.\nAlpha: Camera Recording data for 10 seconds.",
    "Beta: Thermal Recording data indefinitely.\nBeta: Thermal Recording data for 10 seconds.",
    "Gamma: Temp Recording data indefinitely.\nGamma: Temp Recording data for 10 seconds.",
    "Delta: Ion Recording data indefinitely.\nDelta: Ion Recording data for 10 seconds.",
    "Gamma: Gyro Recording data indefinitely.\nGamma: Gyro Recording data for 10 seconds."
]

for i, ((name, duration), expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")

    # Capture output
    import io
    import sys

    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()

    # Create Sensor object and call record() twice
    sensor = Sensor(name)
    sensor.record()         # Without duration
    sensor.record(duration) # With duration

    # Get output
    sys.stdout = old_stdout
    result = buffer.getvalue().strip()

    print(f"Expected:\n{expected}")
    print(f"Output:\n{result}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
