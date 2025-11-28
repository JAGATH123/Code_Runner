class AIAssistant:
    def __init__(self, name, purpose):
        self.name = name
        self.purpose = purpose

    def introduce(self):
        print(f"My name is {self.name} and my purpose is {self.purpose}.")

    def perform_task(self, task):
        # Conditional logic based on purpose
        if self.purpose == 'defense':
            print("Alert: Security protocol activated!")
        elif self.purpose == 'medical':
            print("Health check: All systems normal.")

        print(f"{self.name} is performing: {task}")

# Test all cases
test_cases = [
    ("Nova", "navigation", "scan asteroid"),
    ("Atlas", "communication", "relay message"),
    ("Orion", "defense", "monitor threats"),
    ("Luna", "research", "analyze samples"),
    ("Titan", "maintenance", "repair hull"),
    ("Cosmo", "exploration", "map sector"),
    ("Vega", "medical", "check vitals")
]

for i, (name, purpose, task) in enumerate(test_cases, 1):
    print(f"\n=== Test Case {i}: {name}/{purpose}/{task} ===")
    ai = AIAssistant(name, purpose)
    ai.introduce()
    ai.perform_task(task)
