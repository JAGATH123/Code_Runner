// Performance testing script for optimized Code Runner
const axios = require('axios');

const BASE_URL = 'http://localhost:9002'; // Change to your server URL

// Test code samples
const testCodes = [
  {
    name: 'Simple Print',
    code: 'print("Hello World")\nprint("Testing 123")',
    language: 'python'
  },
  {
    name: 'Loop Test',
    code: `
for i in range(10):
    print(f"Number: {i}")

total = sum(range(10))
print(f"Total: {total}")`,
    language: 'python'
  },
  {
    name: 'Math Operations',
    code: `
import math

numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"Original: {numbers}")
print(f"Squared: {squared}")
print(f"Square root of 16: {math.sqrt(16)}")`,
    language: 'python'
  },
  {
    name: 'Matplotlib Test',
    code: `
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 6))
plt.plot(x, y)
plt.title("Sine Wave")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()`,
    language: 'python'
  }
];

// Test individual code execution
async function testCodeExecution(testCase) {
  const start = Date.now();

  try {
    const response = await axios.post(`${BASE_URL}/api/run`, {
      code: testCase.code,
      language: testCase.language
    });

    const duration = Date.now() - start;
    const data = response.data;

    return {
      name: testCase.name,
      duration,
      status: data.status,
      executionTime: data.executionTime,
      hasPlots: data.plots && data.plots.length > 0,
      poolStats: data._poolStats,
      success: true,
      error: null
    };
  } catch (error) {
    const duration = Date.now() - start;
    return {
      name: testCase.name,
      duration,
      status: 'Error',
      success: false,
      error: error.response?.data || error.message
    };
  }
}

// Load test with concurrent requests
async function loadTest(concurrentUsers = 10, testDuration = 30000) {
  console.log(`\n🚀 Starting load test with ${concurrentUsers} concurrent users for ${testDuration/1000} seconds...`);

  const results = [];
  const startTime = Date.now();
  const endTime = startTime + testDuration;

  // Create concurrent user simulations
  const userPromises = [];

  for (let i = 0; i < concurrentUsers; i++) {
    const userPromise = (async () => {
      const userResults = [];
      let requestCount = 0;

      while (Date.now() < endTime) {
        const testCase = testCodes[requestCount % testCodes.length];
        const result = await testCodeExecution(testCase);
        userResults.push(result);
        requestCount++;

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      }

      return {
        userId: i,
        requests: userResults,
        totalRequests: requestCount
      };
    })();

    userPromises.push(userPromise);
  }

  // Wait for all users to complete
  const userResults = await Promise.all(userPromises);

  // Aggregate results
  const allRequests = userResults.flatMap(user => user.requests);
  const successful = allRequests.filter(r => r.success);
  const failed = allRequests.filter(r => !r.success);

  const avgDuration = successful.reduce((sum, r) => sum + r.duration, 0) / successful.length;
  const avgExecutionTime = successful.reduce((sum, r) => sum + (r.executionTime || 0), 0) / successful.length;

  console.log('\n📊 Load Test Results:');
  console.log(`Total Requests: ${allRequests.length}`);
  console.log(`Successful: ${successful.length} (${(successful.length/allRequests.length*100).toFixed(2)}%)`);
  console.log(`Failed: ${failed.length} (${(failed.length/allRequests.length*100).toFixed(2)}%)`);
  console.log(`Average Response Time: ${avgDuration.toFixed(2)}ms`);
  console.log(`Average Execution Time: ${avgExecutionTime.toFixed(2)}ms`);
  console.log(`Requests per second: ${(allRequests.length / (testDuration/1000)).toFixed(2)}`);

  if (successful.length > 0) {
    const lastResult = successful[successful.length - 1];
    if (lastResult.poolStats) {
      console.log(`\n🐳 Container Pool Stats:`);
      console.log(`Total Containers: ${lastResult.poolStats.total}`);
      console.log(`Busy Containers: ${lastResult.poolStats.busy}`);
      console.log(`Idle Containers: ${lastResult.poolStats.idle}`);
    }
  }

  return {
    totalRequests: allRequests.length,
    successful: successful.length,
    failed: failed.length,
    avgDuration,
    avgExecutionTime,
    requestsPerSecond: allRequests.length / (testDuration/1000)
  };
}

// Test cache performance
async function testCachePerformance() {
  console.log('\n💾 Testing cache performance...');

  try {
    // Test problems endpoint
    const start1 = Date.now();
    const response1 = await axios.get(`${BASE_URL}/api/problems`);
    const duration1 = Date.now() - start1;
    console.log(`First request (cache miss): ${duration1}ms`);

    // Second request should be cached
    const start2 = Date.now();
    const response2 = await axios.get(`${BASE_URL}/api/problems`);
    const duration2 = Date.now() - start2;
    console.log(`Second request (cache hit): ${duration2}ms`);

    const improvement = ((duration1 - duration2) / duration1 * 100).toFixed(2);
    console.log(`Cache improvement: ${improvement}% faster`);

    return { cacheMiss: duration1, cacheHit: duration2, improvement };
  } catch (error) {
    console.error('Cache test failed:', error.message);
    return null;
  }
}

// Main testing function
async function runTests() {
  console.log('🧪 Code Runner Performance Tests\n');

  // Test individual executions
  console.log('1️⃣ Testing individual code executions...');
  for (const testCase of testCodes) {
    const result = await testCodeExecution(testCase);
    console.log(`${result.success ? '✅' : '❌'} ${result.name}: ${result.duration}ms (execution: ${result.executionTime || 'N/A'}ms)`);

    if (result.hasPlots) {
      console.log('   📊 Plot generated successfully');
    }

    if (!result.success) {
      console.log(`   Error: ${result.error}`);
    }
  }

  // Test cache performance
  await testCachePerformance();

  // Load test with 5 concurrent users for 30 seconds
  await loadTest(5, 30000);

  // Load test with 10 concurrent users for 15 seconds
  await loadTest(10, 15000);

  console.log('\n✅ Performance tests completed!');
}

// Add command line arguments
const args = process.argv.slice(2);
if (args.includes('--load-only')) {
  const users = parseInt(args[args.indexOf('--users') + 1]) || 10;
  const duration = parseInt(args[args.indexOf('--duration') + 1]) || 30000;
  loadTest(users, duration);
} else if (args.includes('--cache-only')) {
  testCachePerformance();
} else {
  runTests();
}