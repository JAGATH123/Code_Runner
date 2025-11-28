class CrewMember:
    def __init__(self, name, email, password):
        self.name = name           # Public attribute (no prefix)
        self._email = email        # Protected attribute (single underscore)
        self.__password = password # Private attribute (double underscore)

# Test all cases
test_cases = [
    ("Captain Nova", "nova@ship.com", "secret123"),       # len=12, even, >=10
    ("Engineer Smith", "smith@ship.com", "pass456"),      # len=14, even, >=10
    ("Dr. Chen", "chen@med.ship", "medical789"),          # len=8, even, <10
    ("Pilot Ray", "ray@nav.ship", "fly999"),              # len=9, odd, <10
    ("Admiral Lee", "admiral@command.ship", "topsecret")  # len=11, odd, >=10
]

expected_outputs = [
    "Senior Crew: Captain Nova\nnova@ship.com",
    "Senior Crew: Engineer Smith\nsmith@ship.com",
    "Crew: Dr. Chen\nchen@med.ship",
    "New Crew: Pilot Ray\nray@nav.ship",
    "Lead Crew: Admiral Lee\nadmiral@command.ship"
]

for i, ((name, email, password), expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}, {'even' if len(name) % 2 == 0 else 'odd'}) ===")

    # Create CrewMember object
    crew = CrewMember(name, email, password)

    # Capture output
    import io
    import sys

    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()

    # Determine prefix based on name length
    name_length = len(crew.name)
    if name_length >= 10:
        if name_length % 2 == 0:
            prefix = "Senior Crew:"
        else:
            prefix = "Lead Crew:"
    else:  # name_length < 10
        if name_length % 2 == 0:
            prefix = "Crew:"
        else:
            prefix = "New Crew:"

    # Print name with prefix and email
    print(f"{prefix} {crew.name}")
    print(crew._email)

    # Get output
    sys.stdout = old_stdout
    result = buffer.getvalue().strip()

    print(f"Expected:\n{expected}")
    print(f"Output:\n{result}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
