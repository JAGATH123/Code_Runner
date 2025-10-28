// Simple test script for basic functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:9002';

async function testBasicExecution() {
  console.log('🧪 Testing basic code execution...\n');

  const testCases = [
    {
      name: 'Simple Print',
      code: 'print("Hello World")',
      language: 'python'
    },
    {
      name: 'Math Operation',
      code: 'result = 5 + 3\nprint(f"5 + 3 = {result}")',
      language: 'python'
    },
    {
      name: 'Loop Test',
      code: 'for i in range(3):\n    print(f"Count: {i}")',
      language: 'python'
    }
  ];

  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.name}`);
    const start = Date.now();

    try {
      const response = await axios.post(`${BASE_URL}/api/run`, {
        code: testCase.code,
        language: testCase.language
      });

      const duration = Date.now() - start;
      const data = response.data;

      console.log(`✅ Status: ${data.status}`);
      console.log(`✅ Duration: ${duration}ms`);
      console.log(`✅ Execution Time: ${data.executionTime}ms`);
      console.log(`✅ Output: ${data.stdout}`);

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
    }

    console.log('─'.repeat(50));
  }
}

testBasicExecution();