# Session ID Structure

This document defines the session ID mapping across all levels in the Code Runner application.

**Last Updated**: 2025-11-19

---

## Level 1 (Ages 11-14)

**Status**: ✅ **COMPLETED** (11 sessions total)

### Regular Sessions (60 problems)
- **Session 1** (Problems 1-6): session_id **1** ✅
- **Session 2** (Problems 7-12): session_id **2** ✅
- **Session 3** (Problems 13-18): session_id **3** ✅
- **Session 4** (Problems 19-24): session_id **4** ✅
- **Session 5** (Problems 25-30): session_id **5** ✅
- **Session 6** (Problems 31-36): session_id **6** ✅
- **Session 7** (Problems 37-42): session_id **7** ✅
- **Session 8** (Problems 43-48): session_id **8** ✅
- **Session 9** (Problems 49-54): session_id **9** ✅
- **Session 10** (Problems 55-60): session_id **10** ✅

### Code Convergence
- **Code Convergence L1**: session_id **11** ✅

**Summary**: 10 regular sessions + 1 Code Convergence = **11/11 sessions complete**

---

## Level 2 (Ages 11-14)

**Status**: ✅ **COMPLETED** (11 sessions total)

### Regular Sessions (60 problems)
- **Session 1** (Problems 61-66): session_id **12** ✅
- **Session 2** (Problems 67-72): session_id **13** ✅
- **Session 3** (Problems 73-78): session_id **14** ✅
- **Session 4** (Problems 79-84): session_id **15** ✅
- **Session 5** (Problems 85-90): session_id **16** ✅
- **Session 6** (Problems 91-96): session_id **17** ✅
- **Session 7** (Problems 97-102): session_id **18** ✅
- **Session 8** (Problems 103-108): session_id **19** ✅
- **Session 9** (Problems 109-114): session_id **20** ✅
- **Session 10** (Problems 115-120): session_id **21** ✅

### Code Convergence
- **Code Convergence L2**: session_id **22** ✅

**Summary**: 10 regular sessions + 1 Code Convergence = **11/11 sessions complete**

---

## Level 3 (Ages 11-14)

**Status**: 🚧 **IN PROGRESS** (1/11 sessions complete)

### Regular Sessions (60 problems planned)
- **Session 1** (Problems 121-126): session_id **23** ✅ (1/6 problems complete)
  - Problem 121: Understanding Python Modules ✅
  - Problem 122-126: 🔜 Pending
- **Session 2** (Problems 127-132): session_id **24** 🔜 Not Started
- **Session 3** (Problems 133-138): session_id **25** 🔜 Not Started
- **Session 4** (Problems 139-144): session_id **26** 🔜 Not Started
- **Session 5** (Problems 145-150): session_id **27** 🔜 Not Started
- **Session 6** (Problems 151-156): session_id **28** 🔜 Not Started
- **Session 7** (Problems 157-162): session_id **29** 🔜 Not Started
- **Session 8** (Problems 163-168): session_id **30** 🔜 Not Started
- **Session 9** (Problems 169-174): session_id **31** 🔜 Not Started
- **Session 10** (Problems 175-180): session_id **32** 🔜 Not Started

### Code Convergence
- **Code Convergence L3**: session_id **33** 🔜 Not Started

**Summary**: 10 regular sessions + 1 Code Convergence = **1/11 sessions in progress**

---

## Level 4 (Ages 11-14)

**Status**: 📋 **PLANNED** (0/11 sessions)

### Regular Sessions (60 problems planned)
- **Session 1** (Problems 181-186): session_id **34** 📋 Planned
- **Session 2** (Problems 187-192): session_id **35** 📋 Planned
- **Session 3** (Problems 193-198): session_id **36** 📋 Planned
- **Session 4** (Problems 199-204): session_id **37** 📋 Planned
- **Session 5** (Problems 205-210): session_id **38** 📋 Planned
- **Session 6** (Problems 211-216): session_id **39** 📋 Planned
- **Session 7** (Problems 217-222): session_id **40** 📋 Planned
- **Session 8** (Problems 223-228): session_id **41** 📋 Planned
- **Session 9** (Problems 229-234): session_id **42** 📋 Planned
- **Session 10** (Problems 235-240): session_id **43** 📋 Planned

### Code Convergence
- **Code Convergence L4**: session_id **44** 📋 Planned

**Summary**: 10 regular sessions + 1 Code Convergence = **0/11 sessions planned**

---

## Overall Progress Summary

| Level | Age Group | Sessions Complete | Problems Complete | Status |
|-------|-----------|-------------------|-------------------|--------|
| Level 1 | 11-14 | 11/11 (100%) | 60/60 + 1 CC | ✅ Complete |
| Level 2 | 11-14 | 11/11 (100%) | 60/60 + 1 CC | ✅ Complete |
| Level 3 | 11-14 | 1/11 (9%) | 1/60 | 🚧 In Progress |
| Level 4 | 11-14 | 0/11 (0%) | 0/60 | 📋 Planned |
| **Total** | **11-14** | **23/44 (52%)** | **121/240 + 2 CC** | **🚧 In Progress** |

---

## Important Notes

### Session ID Rules
1. **Sequential IDs**: Session IDs are sequential within each level
2. **Code Convergence Gap**: Each level has a Code Convergence problem at the end of its session range
3. **No Overlaps**: Session IDs never overlap between levels
4. **6 Problems per Session**: Each regular session contains exactly 6 problems (Cases 1-6)

### Problem ID Ranges
- **Level 1**: Problems 1-60 + Code Convergence (problem_id varies)
- **Level 2**: Problems 61-120 + Code Convergence (problem_id varies)
- **Level 3**: Problems 121-180 + Code Convergence (planned)
- **Level 4**: Problems 181-240 + Code Convergence (planned)

### Level 3 Format Changes
- **No case_code field**: Level 3 problems don't include case_code examples
- **No Input/Output in question**: Sample input/output are in separate fields only
- **More advanced concepts**: Focuses on modules, file handling, advanced data structures

---

## Maintenance Instructions

### When Adding New Problems

1. **Update seed files** in `scripts/seed-problems/[age-group]/level-[N]/`
2. **Create/update session metadata** in `scripts/seed-sessions/`
3. **Add npm scripts** to `package.json`:
   ```json
   "seed:problem[N]": "tsx scripts/seed-problems/[age-group]/level-[N]/seed-problem-[N].ts"
   ```
4. **Reseed the database**:
   ```bash
   npm run seed:problem[N]
   npm run seed:session[N]-level[N]
   ```
5. **Update this document**:
   - Mark problems/sessions as complete ✅
   - Update progress percentages
   - Update "Last Updated" date at top

### When Fixing Session IDs

1. **Update seed files** with correct session_id values
2. **Run fix scripts** (if available) or manually edit
3. **Reseed entire level** to update database:
   ```bash
   powershell -ExecutionPolicy Bypass -File scripts/utilities/reseed-all-level2.ps1
   ```
4. **Verify changes** by checking a sample problem in the database

---

## Utility Scripts

### Level 2 Scripts
- **Fix session IDs**: `scripts/utilities/fix-level2-session-ids-v2.ps1`
- **Reseed all Level 2**: `scripts/utilities/reseed-all-level2.ps1`

### Individual Problem Seeding
```bash
# Seed individual problems
npm run seed:problem61   # Level 2, Session 1, Case 1
npm run seed:problem121  # Level 3, Session 1, Case 1

# Seed session metadata
npm run seed:session1-level2
npm run seed:session1-level3

# Seed Code Convergence
npm run seed:code-convergence-L1
npm run seed:code-convergence-L2
```

---

## Update History

| Date | Level | Changes | Updated By |
|------|-------|---------|------------|
| 2025-11-19 | Level 2 | Fixed session ID mapping errors (sessions 3, 6, 8, 10) | System |
| 2025-11-19 | Level 3 | Created Session 1, Case 1 (Problem 121) | System |
| 2025-11-19 | All | Created comprehensive progress tracking document | System |

---

## Future Expansion Plan

### Short Term (Next 10 problems)
- Level 3, Session 1: Complete Cases 2-6 (Problems 122-126)

### Medium Term (Next 50 problems)
- Level 3, Sessions 2-9: Complete 48 problems (Problems 127-174)

### Long Term (Next 100+ problems)
- Level 3: Complete Session 10 + Code Convergence (Problems 175-180 + CC)
- Level 4: Begin Session 1 (Problems 181-186)

**Note**: This document should be updated whenever new problems, sessions, or levels are added to the platform.
