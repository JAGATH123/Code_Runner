const axios = require('axios');

const BASE_URL = 'http://localhost:9002';

async function testMatplotlib() {
  console.log('🎨 Testing matplotlib plot generation...\n');

  const matplotlibCode = `
import matplotlib.pyplot as plt
import numpy as np

# Generate data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.title("Sine Wave")
plt.xlabel("X values")
plt.ylabel("Y values")
plt.grid(True)
plt.show()

print("Plot generated successfully!")
`;

  const start = Date.now();

  try {
    const response = await axios.post(`${BASE_URL}/api/run`, {
      code: matplotlibCode,
      language: 'python'
    });

    const duration = Date.now() - start;
    const data = response.data;

    console.log(`✅ Status: ${data.status}`);
    console.log(`✅ Duration: ${duration}ms`);
    console.log(`✅ Execution Time: ${data.executionTime}ms`);
    console.log(`✅ Output: ${data.stdout}`);

    if (data.plots && data.plots.length > 0) {
      console.log(`🎨 Plot generated! ${data.plots.length} plot(s)`);
      console.log(`🎨 Plot data size: ${data.plots[0].length} characters`);
      console.log(`🎨 Plot format: ${data.plots[0].substring(0, 30)}...`);
    } else {
      console.log(`❌ No plots generated`);
    }

    if (data._poolStats) {
      console.log(`✅ Pool: ${data._poolStats.busy} busy, ${data._poolStats.idle} idle`);
    }

    if (data.stderr) {
      console.log(`⚠️  Stderr: ${data.stderr}`);
    }

  } catch (error) {
    const duration = Date.now() - start;
    console.log(`❌ Failed after ${duration}ms`);
    console.log(`❌ Error: ${error.response?.data?.error || error.message}`);
    if (error.response?.data?.stderr) {
      console.log(`❌ Stderr: ${error.response.data.stderr}`);
    }
  }
}

testMatplotlib();