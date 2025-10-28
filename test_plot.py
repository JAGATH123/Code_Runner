import matplotlib.pyplot as plt
import numpy as np

# Create simple test plots
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 6))
plt.plot(x, y)
plt.title('Test Sine Wave')
plt.xlabel('X values')
plt.ylabel('Y values')
plt.show()

# Create another plot
plt.figure(figsize=(6, 4))
plt.scatter(x[::10], y[::10])
plt.title('Scatter Plot')
plt.show()

print("Plots generated successfully!")