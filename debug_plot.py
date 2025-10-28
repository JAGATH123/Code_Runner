import matplotlib.pyplot as plt
import numpy as np
import os

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure()
plt.plot(x, y)
plt.savefig('/tmp/plot_0.png', dpi=100, bbox_inches='tight')
print('Plot saved to /tmp/plot_0.png')

# List files in /tmp
import subprocess
result = subprocess.run(['ls', '-la', '/tmp/'], capture_output=True, text=True)
print('Contents of /tmp/:')
print(result.stdout)

# Try to list plot files specifically
result2 = subprocess.run(['ls', '/tmp/plot_*.png'], shell=True, capture_output=True, text=True)
print('Plot files:')
print(repr(result2.stdout))
print('stderr:', repr(result2.stderr))