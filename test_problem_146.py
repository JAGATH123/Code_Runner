class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def update_grade(self, new_grade):
        # Extract grade numbers
        current_grade_num = int(self.grade[:-2])
        new_grade_num = int(new_grade[:-2])

        # Sum the grade numbers
        grade_sum = current_grade_num + new_grade_num

        # Determine prefix based on sum
        if grade_sum % 2 == 0:
            prefix = "Level Up:"
        else:
            prefix = "Promotion:"

        # Print current status
        print(f"{prefix} {self.name} is in grade {self.grade}.")

        # Update grade
        self.grade = new_grade

        # Print updated status
        print(f"{prefix} {self.name} is now in grade {self.grade}.")

# Test all cases
test_cases = [
    ("Ravi", "7th", "8th"),      # 7+8=15 (odd) → Promotion
    ("Anya", "6th", "7th"),      # 6+7=13 (odd) → Promotion
    ("Maya", "7th", "9th"),      # 7+9=16 (even) → Level Up
    ("Kiran", "9th", "10th"),    # 9+10=19 (odd) → Promotion
    ("Zara", "6th", "8th"),      # 6+8=14 (even) → Level Up
    ("Arjun", "9th", "11th"),    # 9+11=20 (even) → Level Up
    ("Leena", "7th", "8th")      # 7+8=15 (odd) → Promotion
]

for i, (name, grade, new_grade) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name}/{grade}/{new_grade} ===")
    student = Student(name, grade)
    student.update_grade(new_grade)
