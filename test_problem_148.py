class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def check_pass(self):
        # Check if passed (>= 50)
        if self.score >= 50:
            # Check if even or odd
            if self.score % 2 == 0:
                print(f"Success: {self.name} has passed.")
            else:
                print(f"Victory: {self.name} has passed.")
        else:  # Failed (< 50)
            # Check if even or odd
            if self.score % 2 == 0:
                print(f"Failure: {self.name} has failed.")
            else:
                print(f"Defeat: {self.name} has failed.")

# Test all cases
test_cases = [
    ("Rohit", 45),   # odd, fail → Defeat
    ("Anya", 75),    # odd, pass → Victory
    ("Ravi", 50),    # even, pass → Success
    ("Maya", 49),    # odd, fail → Defeat
    ("Kiran", 88),   # even, pass → Success
    ("Zara", 32),    # even, fail → Failure
    ("Arjun", 65)    # odd, pass → Victory
]

for i, (name, score) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name}/{score} ===")
    student = Student(name, score)
    student.check_pass()
