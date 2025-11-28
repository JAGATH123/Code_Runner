class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

        # Determine rank prefix based on age
        if age >= 12:
            if age % 2 == 0:
                prefix = "Senior:"
            else:
                prefix = "Cadet:"
        else:  # age < 12
            if age % 2 == 0:
                prefix = "Junior:"
            else:
                prefix = "Recruit:"

        print(f"{prefix} Name: {self.name}, Age: {self.age}")

# Test all cases
test_cases = [
    ("Arjun", 12),   # age>=12, even → Senior
    ("Maya", 14),    # age>=12, even → Senior
    ("Ravi", 11),    # age<12, odd → Recruit
    ("Zara", 13),    # age>=12, odd → Cadet
    ("Kiran", 10),   # age<12, even → Junior
    ("Leena", 15),   # age>=12, odd → Cadet
    ("Rohan", 9)     # age<12, odd → Recruit
]

for i, (name, age) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name}/{age} ===")
    person = Person(name, age)
