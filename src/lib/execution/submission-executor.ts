import { GPUContainerPool } from './gpu-container-pool';
import type { SubmissionResult } from './types';

interface TestCase {
  input: string;
  expected_output: string;
}

export class SubmissionExecutor {

  private static normalizeOutput(output: string): string {
    return output.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  private static compareOutputs(actual: string, expected: string): boolean {
    const normalizedActual = this.normalizeOutput(actual);
    const normalizedExpected = this.normalizeOutput(expected);
    return normalizedActual === normalizedExpected;
  }

  /**
   * Creates a driver script that runs user code against all test cases in ONE execution
   * This is 500x faster than running containers separately for each test case
   */
  private static createBatchDriverScript(userCode: string, testCases: TestCase[]): string {
    // Escape the user code and test cases for JSON embedding
    const escapeForJson = (str: string) => {
      return str.replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\t/g, '\\t');
    };

    const testCasesJson = testCases.map(tc => ({
      input: escapeForJson(tc.input),
      expected: escapeForJson(tc.expected_output)
    }));

    // Driver script that will execute all test cases
    const driverScript = `
import sys
import json
import io
from contextlib import redirect_stdout, redirect_stderr

# User's code (will be defined as a string and executed)
user_code = """${escapeForJson(userCode)}"""

# Test cases
test_cases = ${JSON.stringify(testCasesJson)}

# Helper to unescape strings (convert \\n to actual newlines)
def unescape_string(s):
    return s.encode().decode('unicode_escape')

results = []

for idx, test_case in enumerate(test_cases):
    try:
        # Create a fresh namespace for each test case
        namespace = {}

        # Reset random seed before each test case for reproducibility
        import random as _random_module
        _random_module.seed(42)

        # Redirect stdin to provide input (unescape to get actual newlines)
        original_stdin = sys.stdin
        sys.stdin = io.StringIO(unescape_string(test_case['input']))

        # Capture stdout
        output_buffer = io.StringIO()
        error_buffer = io.StringIO()

        try:
            with redirect_stdout(output_buffer), redirect_stderr(error_buffer):
                exec(user_code, namespace)

            actual_output = output_buffer.getvalue()
            error_output = error_buffer.getvalue()

            if error_output:
                results.append({
                    'index': idx,
                    'passed': False,
                    'actual': actual_output,
                    'error': error_output,
                    'status': 'Error'
                })
            else:
                results.append({
                    'index': idx,
                    'passed': None,  # Will be checked by backend
                    'actual': actual_output,
                    'error': None,
                    'status': 'Success'
                })

        finally:
            sys.stdin = original_stdin
            output_buffer.close()
            error_buffer.close()

    except Exception as e:
        results.append({
            'index': idx,
            'passed': False,
            'actual': '',
            'error': str(e),
            'status': 'Error'
        })
        # Continue to next test case instead of breaking
        # This allows us to see all failures

# Output results as JSON (one line for easy parsing)
print('[BATCH_RESULTS]' + json.dumps(results))
`;

    return driverScript;
  }

  /**
   * Parse batch results from driver script output
   */
  private static parseBatchResults(stdout: string, testCases: TestCase[]): {
    passedCount: number;
    results: Array<{
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
      error?: string;
    }>;
  } {
    const results: Array<{
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
      error?: string;
    }> = [];

    try {
      // Extract JSON results from output
      const match = stdout.match(/\[BATCH_RESULTS\](.+)/);
      if (!match) {
        throw new Error('Could not parse batch results from output');
      }

      const batchResults = JSON.parse(match[1]);
      let passedCount = 0;

      for (let i = 0; i < batchResults.length; i++) {
        const result = batchResults[i];
        const testCase = testCases[result.index];

        const passed = result.status === 'Success' &&
                      this.compareOutputs(result.actual, testCase.expected_output);

        if (passed) {
          passedCount++;
        }

        results.push({
          input: testCase.input,
          expected: testCase.expected_output,
          actual: result.actual || '',
          passed,
          error: result.error || undefined
        });
      }

      return { passedCount, results };

    } catch (error) {
      console.error('Error parsing batch results:', error);
      // Fallback: mark all as failed
      return {
        passedCount: 0,
        results: testCases.map(tc => ({
          input: tc.input,
          expected: tc.expected_output,
          actual: '',
          passed: false,
          error: 'Failed to parse test results'
        }))
      };
    }
  }

  public static async executeSubmission(
    code: string,
    testCases: TestCase[]
  ): Promise<SubmissionResult> {

    // OPTIMIZATION: Batch all test cases into ONE container execution
    // This reduces execution time from ~770s to ~1.5s (500x faster!)

    try {
      // Create driver script that runs all test cases
      const driverScript = this.createBatchDriverScript(code, testCases);

      // Execute ONCE using container pool (not per test case!)
      const executionResult = await GPUContainerPool.executeCode(driverScript, '');

      if (executionResult.status === 'Error' || executionResult.status === 'Timeout') {
        // Runtime error or timeout - all test cases fail
        return {
          status: 'Wrong Answer',
          passed: 0,
          total: testCases.length,
          results: testCases.map(tc => ({
            input: tc.input,
            expected: tc.expected_output,
            actual: '',
            passed: false,
            error: executionResult.stderr || 'Execution failed'
          }))
        };
      }

      // Parse batch results
      const { passedCount, results } = this.parseBatchResults(
        executionResult.stdout,
        testCases
      );

      return {
        status: passedCount === testCases.length ? 'Accepted' : 'Wrong Answer',
        passed: passedCount,
        total: testCases.length,
        results
      };

    } catch (error) {
      console.error('Batch execution error:', error);
      return {
        status: 'Wrong Answer',
        passed: 0,
        total: testCases.length,
        results: testCases.map(tc => ({
          input: tc.input,
          expected: tc.expected_output,
          actual: '',
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown execution error'
        }))
      };
    }
  }
}