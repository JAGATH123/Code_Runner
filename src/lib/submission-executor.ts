import { DockerPythonExecutor } from './docker-executor';
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

  public static async executeSubmission(
    code: string, 
    testCases: TestCase[]
  ): Promise<SubmissionResult> {
    let passedCount = 0;
    const results: Array<{
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
      error?: string;
    }> = [];

    for (const testCase of testCases) {
      try {
        const result = await DockerPythonExecutor.executeCode(code, testCase.input);
        
        let passed = false;
        let error: string | undefined;

        if (result.status === 'Success') {
          passed = this.compareOutputs(result.stdout, testCase.expected_output);
          if (passed) {
            passedCount++;
          }
        } else {
          error = result.stderr || 'Runtime error occurred';
        }

        results.push({
          input: testCase.input,
          expected: testCase.expected_output,
          actual: result.stdout,
          passed,
          error
        });

        // Stop early if there's a runtime error
        if (result.status === 'Error' || result.status === 'Timeout') {
          break;
        }

      } catch (error) {
        results.push({
          input: testCase.input,
          expected: testCase.expected_output,
          actual: '',
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown execution error'
        });
        break; // Stop execution on unexpected errors
      }
    }

    return {
      status: passedCount === testCases.length ? 'Accepted' : 'Wrong Answer',
      passed: passedCount,
      total: testCases.length,
      results // Optional: include detailed results for debugging
    };
  }
}