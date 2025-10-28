// Test script to verify API returns formatted errors
const API_URL = 'http://localhost:9002/api/run';

const testCases = [
  {
    name: 'Syntax Error - Missing closing quote',
    code: `print("Hello World`
  },
  {
    name: 'Indentation Error',
    code: `x = 5
  print(x)`
  },
  {
    name: 'Name Error',
    code: `print(undefined_variable)`
  },
  {
    name: 'Type Error',
    code: `result = "5" + 3
print(result)`
  },
  {
    name: 'Zero Division Error',
    code: `result = 10 / 0
print(result)`
  },
  {
    name: 'Success Case',
    code: `print("Hello, World!")`
  }
];

async function testAPI() {
  console.log('Testing API Error Formatting\n');
  console.log('='.repeat(80));

  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i];
    console.log(`\n${i + 1}. ${test.name}`);
    console.log('-'.repeat(80));
    console.log('Code:');
    console.log(test.code);
    console.log('\n' + '-'.repeat(80));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: test.code,
          input: '',
          language: 'python'
        })
      });

      const result = await response.json();

      console.log('Response:');
      console.log(`  Status: ${result.status}`);

      if (result.stdout) {
        console.log(`  Output: ${result.stdout}`);
      }

      if (result.stderr) {
        console.log(`  Error:\n${result.stderr}`);
      }

    } catch (error) {
      console.log(`  API Error: ${error.message}`);
    }

    console.log('='.repeat(80));

    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

testAPI().catch(console.error);
