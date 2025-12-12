class Scout:
    def __init__(self, power):
        self.name = "Scout"
        self.power = power

    def respond(self):
        print("Scout responding: Scanning area.")

    def __add__(self, other):
        combined_name = self.name + "-" + other.name
        combined_power = self.power + other.power
        return CombinedAI(combined_name, combined_power)

class Engineer:
    def __init__(self, power):
        self.name = "Engineer"
        self.power = power

    def respond(self):
        print("Engineer responding: Building structures.")

    def __add__(self, other):
        combined_name = self.name + "-" + other.name
        combined_power = self.power + other.power
        return CombinedAI(combined_name, combined_power)

class Commander:
    def __init__(self, power):
        self.name = "Commander"
        self.power = power

    def respond(self):
        print("Commander responding: Leading the team.")

    def __add__(self, other):
        combined_name = self.name + "-" + other.name
        combined_power = self.power + other.power
        return CombinedAI(combined_name, combined_power)

class CombinedAI:
    def __init__(self, name, power):
        self.name = name
        self.power = power

    def __str__(self):
        return f"{self.name} with power {self.power}"

# Take inputs
ai1_type = input()
power1 = int(input())
ai2_type = input()
power2 = int(input())

# Create AI objects based on input
if ai1_type == "Scout":
    ai1 = Scout(power1)
elif ai1_type == "Engineer":
    ai1 = Engineer(power1)
else:  # Commander
    ai1 = Commander(power1)

if ai2_type == "Scout":
    ai2 = Scout(power2)
elif ai2_type == "Engineer":
    ai2 = Engineer(power2)
else:  # Commander
    ai2 = Commander(power2)

# Demonstrate polymorphism
ai1.respond()
ai2.respond()

# Demonstrate operator overloading
combined = ai1 + ai2
print(combined)
