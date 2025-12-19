# Pygame Submission Validation Flow

## Complete Flow: How Console Output is Used for Validation

### Step-by-Step Process

```
1. Student clicks "Submit Mission" on Pygame problem (Session 9 or 10)
   ↓
2. Frontend sends code to /api/submit
   ↓
3. Submit API checks: problem.session_id === 42 || 43?
   ↓ YES (Pygame problem)
4. Calls SubmissionExecutor.executeSubmission(code, testCases, isPygameProblem=TRUE)
   ↓
5. SubmissionExecutor detects Pygame mode
   Console logs: "===== PYGAME SUBMISSION ====="
   Console logs: "Using CONSOLE OUTPUT (print capture) for validation"
   Console logs: "NOT using SYSTEM OUTPUT"
   ↓
6. Calls GPUContainerPool.executeCode(code, '')
   ↓
7. GPUContainerPool.runCodeInContainer() detects Pygame
   ↓
8. STEP 1: Runs code for 5 frames in Docker to capture print output
   - Modifies code to exit after 5 frames
   - Executes in container
   - Captures stdout (print statements)
   - Filters out Pygame system messages
   - Returns clean print output as stdout
   ↓
9. STEP 2: Compiles with Pygbag for interactive mode
   - Creates WebAssembly bundle
   - Returns { stdout: pygamePrintOutput, pygameBundle }
   ↓
10. SubmissionExecutor receives execution result
    Console logs: "===== VALIDATION SOURCE ====="
    Console logs: "Source: CONSOLE OUTPUT (print capture from initial execution)"
    Console logs: "Captured output: [actual output]"
    Console logs: "Expected output: [expected output]"
    ↓
11. Compares actualOutput (stdout) with expectedOutput
    For each test case:
      - Normalizes both outputs
      - Compares using compareOutputs()
      - Console logs: "Test case - Expected: ... Actual: ... Passed: true/false"
    ↓
12. Returns result
    Console logs: "===== RESULT ====="
    Console logs: "Status: Accepted/Wrong Answer"
    Console logs: "Passed: X/Y"
    Console logs: "Validation used: CONSOLE OUTPUT (print capture)"
    ↓
13. Frontend displays result to student
```

## Key Points

### ✅ What IS Used for Validation
- **CONSOLE OUTPUT** (print capture from initial 5-frame execution)
- This is the `stdout` field from the execution result
- Same output that appears in the UI's CONSOLE OUTPUT section

### ❌ What is NOT Used for Validation
- **SYSTEM OUTPUT** (batch driver stdout)
- Regular Python stdout
- Pygame system messages

## Code Locations

### 1. Pygame Detection
**File**: `src/app/api/submit/route.ts` (Lines 40-42)
```typescript
const problem = await DataService.getProblemById(problemId);
const isPygameProblem = problem && (problem.session_id === 42 || problem.session_id === 43);
```

### 2. Pygame Submission Logic
**File**: `src/lib/execution/submission-executor.ts` (Lines 200-262)
```typescript
if (isPygameProblem) {
  // Execute Pygame code directly
  const executionResult = await GPUContainerPool.executeCode(code, '');

  // Use stdout (CONSOLE OUTPUT) for validation
  const actualOutput = this.normalizeOutput(executionResult.stdout);

  // Compare with expected output
  const passed = this.compareOutputs(actualOutput, tc.expected_output);
}
```

### 3. Print Capture
**File**: `src/lib/execution/gpu-container-pool.ts` (Lines 407-456)
```typescript
// STEP 1: Execute code in regular Python to capture print output
// Runs for 5 frames
// Captures stdout
// Filters Pygame messages
// Returns as pygamePrintOutput

return {
  stdout: pygamePrintOutput,  // ← This is CONSOLE OUTPUT
  pygameBundle
};
```

## Example: Problem 234

### Problem Details
- **Title**: Dynamic Display Refresh
- **Session**: 9 (Pygame Basics)
- **Expected Output**: "Dynamic display active"

### Student Code
```python
import pygame
print("Dynamic display active")
# ... rest of Pygame code
```

### Validation Process
1. Code runs for 5 frames in Docker
2. Print output captured: "Dynamic display active"
3. Compared with expected: "Dynamic display active"
4. Result: ✅ PASS (Accepted)

### Console Logs You'll See
```
[Submission] ===== PYGAME SUBMISSION =====
[Submission] Using CONSOLE OUTPUT (print capture) for validation
[Submission] NOT using SYSTEM OUTPUT
[Pygame] Executing code in regular Python to capture print output...
[Pygame] Captured print output: "Dynamic display active"
[Submission] ===== VALIDATION SOURCE =====
[Submission] Source: CONSOLE OUTPUT (print capture from initial execution)
[Submission] Captured output: "Dynamic display active"
[Submission] Expected output: "Dynamic display active"
[Submission] ===== COMPARING =====
[Submission] Test case - Expected: "Dynamic display active", Actual: "Dynamic display active", Passed: true
[Submission] ===== RESULT =====
[Submission] Status: Accepted
[Submission] Passed: 2/2
[Submission] Validation used: CONSOLE OUTPUT (print capture)
[Submission] ===== END =====
```

## UI Display

### For Pygame Problems (Session 9 & 10)
- ❌ No SYSTEM OUTPUT section shown
- ✅ CONSOLE OUTPUT section always visible
- ✅ Shows print statements from game

### For Regular Problems (Other Sessions)
- ✅ SYSTEM OUTPUT section shown
- ❌ No CONSOLE OUTPUT section

## Testing the Flow

### 1. Run the Database Seeder
```bash
npx tsx scripts/reseed-pygame-problems.ts
```

### 2. Test Problem 234
1. Navigate to Problem 234
2. Write solution:
   ```python
   import pygame
   print("Dynamic display active")
   pygame.init()
   screen = pygame.display.set_mode((600, 400))
   # ... rest of code
   ```
3. Click "Submit Mission"
4. Open browser console (F12)
5. Look for the logs above
6. Verify: Status: Accepted, Passed: 2/2

### 3. Verify in UI
- Should NOT see "SYSTEM OUTPUT" section
- Should ONLY see "CONSOLE OUTPUT" section
- Should show "Dynamic display active" in console output

## Debugging

If submission fails, check console logs for:
1. ✅ `[Submission] ===== PYGAME SUBMISSION =====` - Confirms Pygame detected
2. ✅ Captured output matches expected output exactly
3. ✅ No extra whitespace or newlines
4. ✅ All test cases show `Passed: true`

## Summary

**The submission system for Pygame problems:**
1. ✅ Detects Pygame problems (session_id 42 or 43)
2. ✅ Uses CONSOLE OUTPUT (print capture) for validation
3. ✅ Does NOT use SYSTEM OUTPUT
4. ✅ Compares print statements with expected output
5. ✅ Returns Accepted if all test cases pass

**This is EXACTLY what you requested!**
