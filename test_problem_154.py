class Printer:
    def __init__(self, name):
        self.name = name

    def __call__(self, document):
        name_length = len(self.name)

        # Determine prefix based on name length
        if name_length >= 5:
            if name_length % 2 == 0:
                prefix = "Professional Printer:"
            else:
                prefix = "Advanced Printer:"
        else:  # name_length < 5
            if name_length % 2 == 0:
                prefix = "Basic Printer:"
            else:
                prefix = "Quick Printer:"

        print(f"{prefix} {self.name} is printing: {document}")

# Test all cases
test_cases = [
    ("HP", "Science_Project.pdf"),           # len=2, even, <5 → Basic Printer
    ("Lenovo", "Report.docx"),               # len=6, even, >=5 → Professional Printer
    ("Epson", "Mission_Brief.pdf"),          # len=5, odd, >=5 → Advanced Printer
    ("Brother", "FlightLog.xlsx"),           # len=7, odd, >=5 → Advanced Printer
    ("Samsung", "CrewManifest.txt"),         # len=7, odd, >=5 → Advanced Printer
    ("LGX", "Inventory.csv"),                # len=3, odd, <5 → Quick Printer
    ("Dell", "Navigation_Chart.png")         # len=4, even, <5 → Basic Printer
]

expected_outputs = [
    "Basic Printer: HP is printing: Science_Project.pdf",
    "Professional Printer: Lenovo is printing: Report.docx",
    "Advanced Printer: Epson is printing: Mission_Brief.pdf",
    "Advanced Printer: Brother is printing: FlightLog.xlsx",
    "Advanced Printer: Samsung is printing: CrewManifest.txt",
    "Quick Printer: LGX is printing: Inventory.csv",
    "Basic Printer: Dell is printing: Navigation_Chart.png"
]

for i, ((name, document), expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {name} (len={len(name)}) ===")
    printer = Printer(name)
    print(f"Expected: {expected}")
    print(f"Output: ", end="")
    printer(document)
