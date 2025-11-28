class BaseAI:
    def __init__(self, name):
        self.name = name

    def initialize(self):
        print("Booting base AI system...")

    def process(self):
        print(f"Analyzing data streams: {self.name}")


class TranslationAI(BaseAI):
    def translate(self, data):
        print(f"Science mode: Researching {data}")


class NavigationAI(BaseAI):
    def navigate(self, destination):
        print(f"Pilot mode: Flying through {destination}")


class HybridAI(TranslationAI, NavigationAI):
    def initialize(self):
        print("Initializing systems...")
        print("Advanced protocols loaded.")

    def process(self):
        print(f"Navigating through space: {self.name}")
        super().process()

    def run_all(self, destination, science_data):
        # Required output order
        self.process()
        BaseAI.initialize(self)
        self.navigate(destination)
        self.translate(science_data)
        print("HybridAI Report: Multi-stream analysis complete.")
        self.initialize()


if __name__ == "__main__":
    # Test with the visible test case input
    name = "Nova-1"
    destination = "Asteroid Belt"
    science_data = "Alien Signals"

    ai = HybridAI(name)
    ai.run_all(destination, science_data)
