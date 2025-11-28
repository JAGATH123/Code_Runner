class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        title_length = len(self.title)

        # Determine prefix based on title length
        if title_length >= 10:
            if title_length % 2 == 0:
                prefix = "Long Title:"
            else:
                prefix = "Extended:"
        else:  # title_length < 10
            if title_length % 2 == 0:
                prefix = "Short Title:"
            else:
                prefix = "Brief:"

        return f"{prefix} {self.title} by {self.author}"

# Test all cases
test_cases = [
    ("Wings of Fire", "A.P.J Abdul Kalam"),           # len=13, odd, >=10 → Extended
    ("Harry Potter", "J.K. Rowling"),                 # len=12, even, >=10 → Long Title
    ("The Martian", "Andy Weir"),                     # len=11, odd, >=10 → Extended
    ("Cosmos", "Carl Sagan"),                         # len=6, even, <10 → Short Title
    ("Interstellar Science", "Kip Thorne"),           # len=21, odd, >=10 → Extended
    ("A Brief History of Time", "Stephen Hawking"),   # len=24, even, >=10 → Long Title
    ("Ender Game", "Orson Scott Card")                # len=10, even, >=10 → Long Title
]

expected_outputs = [
    "Extended: Wings of Fire by A.P.J Abdul Kalam",       # len=13, odd, >=10
    "Long Title: Harry Potter by J.K. Rowling",           # len=12, even, >=10
    "Extended: The Martian by Andy Weir",                 # len=11, odd, >=10
    "Short Title: Cosmos by Carl Sagan",                  # len=6, even, <10
    "Long Title: Interstellar Science by Kip Thorne",     # len=20, even, >=10
    "Extended: A Brief History of Time by Stephen Hawking", # len=23, odd, >=10
    "Long Title: Ender Game by Orson Scott Card"          # len=10, even, >=10
]

for i, ((title, author), expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {title} (len={len(title)}) ===")
    book = Book(title, author)
    result = str(book)
    print(f"Output: {result}")
    print(f"Expected: {expected}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
