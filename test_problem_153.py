class Notebook:
    def __init__(self, pages):
        self.pages = pages

    def __len__(self):
        return self.pages

# Test all cases
test_cases = [
    150,  # even, >=100 → Large Notebook
    200,  # even, >=100 → Large Notebook
    101,  # odd, >=100 → Extended Notebook
    75,   # odd, <100 → Compact Notebook
    300,  # even, >=100 → Large Notebook
    50,   # even, <100 → Small Notebook
    251   # odd, >=100 → Extended Notebook
]

expected_outputs = [
    "Large Notebook: 150",      # pages=150, even, >=100
    "Large Notebook: 200",      # pages=200, even, >=100
    "Extended Notebook: 101",   # pages=101, odd, >=100
    "Compact Notebook: 75",     # pages=75, odd, <100
    "Large Notebook: 300",      # pages=300, even, >=100
    "Small Notebook: 50",       # pages=50, even, <100
    "Extended Notebook: 251"    # pages=251, odd, >=100
]

for i, (pages, expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {pages} pages ===")
    notebook = Notebook(pages)
    page_count = len(notebook)

    # Determine prefix based on page count
    if page_count >= 100:
        if page_count % 2 == 0:
            prefix = "Large Notebook:"
        else:
            prefix = "Extended Notebook:"
    else:  # page_count < 100
        if page_count % 2 == 0:
            prefix = "Small Notebook:"
        else:
            prefix = "Compact Notebook:"

    result = f"{prefix} {page_count}"
    print(f"Output: {result}")
    print(f"Expected: {expected}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
