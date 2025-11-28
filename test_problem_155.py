class Movie:
    def __init__(self, title, duration):
        self.title = title
        self.duration = duration

    def __str__(self):
        # Determine prefix based on duration
        if self.duration >= 120:
            if self.duration % 2 == 0:
                prefix = "Epic Movie:"
            else:
                prefix = "Long Film:"
        else:  # duration < 120
            if self.duration % 2 == 0:
                prefix = "Short Movie:"
            else:
                prefix = "Quick Film:"
        return f"{prefix} {self.title}"

    def __len__(self):
        return self.duration

    def __call__(self, action):
        print(f"Now {action} the movie: {self.title}")

# Test all cases
test_cases = [
    ("Interstellar", 169, "playing"),          # dur=169, odd, >=120 → Long Film
    ("Gravity", 91, "streaming"),              # dur=91, odd, <120 → Quick Film
    ("The Martian", 144, "watching"),          # dur=144, even, >=120 → Epic Movie
    ("Apollo 13", 140, "downloading"),         # dur=140, even, >=120 → Epic Movie
    ("Star Wars", 121, "rewatching"),          # dur=121, odd, >=120 → Long Film
    ("Avatar", 162, "pausing"),                # dur=162, even, >=120 → Epic Movie
    ("Inception", 148, "recording")            # dur=148, even, >=120 → Epic Movie
]

expected_outputs = [
    "Long Film: Interstellar\n169\nNow playing the movie: Interstellar",
    "Quick Film: Gravity\n91\nNow streaming the movie: Gravity",
    "Epic Movie: The Martian\n144\nNow watching the movie: The Martian",
    "Epic Movie: Apollo 13\n140\nNow downloading the movie: Apollo 13",
    "Long Film: Star Wars\n121\nNow rewatching the movie: Star Wars",
    "Epic Movie: Avatar\n162\nNow pausing the movie: Avatar",
    "Epic Movie: Inception\n148\nNow recording the movie: Inception"
]

for i, ((title, duration, action), expected) in enumerate(zip(test_cases, expected_outputs), 1):
    print(f"\n=== Test Case {i}: {title} (dur={duration}, {'even' if duration % 2 == 0 else 'odd'}) ===")
    movie = Movie(title, duration)

    # Capture output
    import io
    import sys

    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()

    # Execute the three operations
    print(movie)        # __str__
    print(len(movie))   # __len__
    movie(action)       # __call__

    # Get output
    sys.stdout = old_stdout
    result = buffer.getvalue().strip()

    print(f"Expected:\n{expected}")
    print(f"Output:\n{result}")
    print(f"Match: {'PASS' if result == expected else 'FAIL'}")
