import random
import math
from decimal import Decimal, getcontext
import statistics

# Test star_distance
print("Testing star_distance:")
random.seed(42)
x = random.randint(1, 100)
y = random.randint(1, 100)
print(f"X = {x}, Y = {y}")
distance = math.sqrt(x**2 + y**2)
print(f"Distance: {distance:.2f}")
print()

# Test fuel_calc
print("Testing fuel_calc:")
test_distances = ['100', '250.5', '75.8']
for dist in test_distances:
    getcontext().prec = 10
    result = Decimal(dist) * Decimal('0.437')
    print(f"Input: {dist} -> Output: {float(result):.3f}")
print()

# Test radiation_mean
print("Testing radiation_mean:")
test_radiation = [
    '23,25,19,28,30',
    '15,20,18,22,25'
]
for values_str in test_radiation:
    values = values_str.split(',')
    numbers = [int(x) for x in values]
    avg = statistics.mean(numbers)
    print(f"Input: {values_str} -> Output: {avg:.2f}")
