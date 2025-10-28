# Problem Update Guide: Secure Test Cases Implementation

## ✅ COMPLETED (Problems 21-24)
- Problem 21: Simple If Statement ✓ (1 visible + 4 hidden)
- Problem 22: If-Else Statement ✓ (1 visible + 4 hidden)
- Problem 23: Comparison Operators ✓ (1 visible + 4 hidden)
- Problem 24: elif Statements ✓ (1 visible + 5 hidden)

## 🔄 REMAINING UPDATES NEEDED

### Session 5 (Problem 25)
**Problem 25: Decision Chain**
- Status: NEEDS CREATION
- Convert to: Input-based (fuel + altitude checks)
- Test cases needed: 1 visible + 4 hidden
- Different combinations of fuel/altitude values

### Session 6 (Problems 26-30) ⚠️ CRITICAL - HARDCODED TO INPUT
**Current Issue**: All have hardcoded variables (fuel_level=80, etc.)
**Required**: Convert ALL to input-based

**Problem 26**: Simple Nested If
- OLD: `fuel_level = 80`
- NEW: `fuel_level = int(input())`
- Tests: 80, 60, 76, 40, 50 (boundary tests)

**Problem 27**: Nested If-Else
- OLD: `oxygen_level = 65`
- NEW: `oxygen_level = int(input())`
- Tests: 65, 85, 55, 80, 59

**Problem 28**: Multiple Conditions in Inner If
- OLD: `fuel_level = 70, engine_ready = True`
- NEW: Two inputs or comma-separated
- Tests: Various combinations

**Problem 29**: Deeply Nested If-Else Chain
- OLD: `fuel = 70, oxygen = 80, engine = True`
- NEW: Three inputs
- Tests: All passing, one failing, etc.

**Problem 30**: Nested If-Else with External Flags
- OLD: Multiple hardcoded variables
- NEW: Multiple inputs
- Tests: Different flag combinations

### Sessions 7-10 (Problems 31-47)
Most already use better patterns, but need hidden test cases added.

## Template Structure for All Problems

```typescript
const testCases = [
  {
    problem_id: X,
    case_number: 1,
    input: 'value',
    expected_output: 'output',
    is_hidden: false,  // ONLY ONE VISIBLE
    created_at: new Date(),
  },
  {
    problem_id: X,
    case_number: 2,
    input: 'different_value',
    expected_output: 'different_output',
    is_hidden: true,  // HIDDEN
    created_at: new Date(),
  },
  // Add 3-5 more hidden tests
];
```

## Test Case Strategy

### For Conditional Problems:
- Test TRUE path
- Test FALSE path
- Test boundary values
- Test edge cases

### For Loop Problems:
- Different ranges
- Edge cases (empty, single item)
- Boundary tests

### For List Problems:
- Different list contents
- Different indices
- Edge cases (empty list, single item)

## Quick Reference: Problems Needing Updates

| Problem | Session | Type | Priority | Status |
|---------|---------|------|----------|--------|
| 25 | 5 | Decision Chain | High | TODO |
| 26-30 | 6 | Nested If (HARDCODED) | CRITICAL | TODO |
| 31-35 | 7 | Lists | Medium | TODO |
| 36-40 | 8 | Advanced Lists | Medium | TODO |
| 41-45 | 9 | For Loops | Medium | TODO |
| 46-47 | 10 | Range | Low | TODO |

## Next Steps

1. Create Problem 25
2. **CRITICAL**: Update Session 6 (26-30) with input conversion
3. Add hidden tests to remaining problems
4. Run batch seed script
5. Verify all problems have hidden tests working

## Batch Update Command

```bash
npm run seed:problem21 && npm run seed:problem22 && ... npm run seed:problem47
```

Or use the batch script:
```bash
node scripts/batch-update-all-problems.js
```
