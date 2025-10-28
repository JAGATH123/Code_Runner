// Test script for Python error parser
const { parsePythonError, formatErrorForDisplay } = require('./src/lib/python-error-parser.ts');

// Test cases
const testErrors = [
  {
    name: 'Syntax Error',
    stderr: `  File "/tmp/test.py", line 5
    print("Hello World"
                       ^
SyntaxError: unexpected EOF while parsing`
  },
  {
    name: 'Indentation Error',
    stderr: `  File "/tmp/test.py", line 3
    print("Hello")
    ^
IndentationError: unexpected indent`
  },
  {
    name: 'Name Error',
    stderr: `Traceback (most recent call last):
  File "/tmp/test.py", line 2, in <module>
    print(my_variable)
NameError: name 'my_variable' is not defined`
  },
  {
    name: 'Type Error',
    stderr: `Traceback (most recent call last):
  File "/tmp/test.py", line 3, in <module>
    result = "5" + 3
TypeError: can only concatenate str (not "int") to str`
  },
  {
    name: 'Zero Division Error',
    stderr: `Traceback (most recent call last):
  File "/tmp/test.py", line 4, in <module>
    result = 10 / 0
ZeroDivisionError: division by zero`
  },
  {
    name: 'Timeout Error',
    stderr: 'Code execution timed out (30 seconds limit)'
  }
];

console.log('Testing Python Error Parser\n');
console.log('='.repeat(80));

testErrors.forEach((test, index) => {
  console.log(`\n${index + 1}. ${test.name}`);
  console.log('-'.repeat(80));
  console.log('Original stderr:');
  console.log(test.stderr);
  console.log('\n' + '-'.repeat(80));

  const parsed = parsePythonError(test.stderr);
  if (parsed) {
    console.log('Parsed:');
    console.log(`  Error Type: ${parsed.errorType}`);
    console.log(`  Line Number: ${parsed.lineNumber || 'N/A'}`);
    console.log(`  Friendly Message: ${parsed.friendlyMessage}`);
    if (parsed.suggestion) {
      console.log(`  Suggestion: ${parsed.suggestion}`);
    }

    console.log('\n' + '-'.repeat(80));
    console.log('Formatted Output:');
    console.log(formatErrorForDisplay(parsed));
  } else {
    console.log('Failed to parse error');
  }
  console.log('='.repeat(80));
});
