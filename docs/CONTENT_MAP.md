# Code Runner - Content ID Mapping & Organization

**Last Updated:** 2025-11-18

---

## 📊 Overview

This document provides a complete mapping of all content IDs across the Code Runner platform, including sessions, problems, and organizational structure.

---

## 🎯 Session ID Ranges

### 11-14 Age Group
| Level | Session Range | Status |
|-------|---------------|--------|
| **Level 1** | Sessions 1-10 | ✅ Complete |
| **Level 2** | Sessions 11-20 | ✅ Complete |
| **Level 3** | Sessions 21-30 | 📝 Planned |
| **Level 4** | Sessions 31-40 | 📝 Planned |

### 15-18 Age Group
| Level | Session Range | Status |
|-------|---------------|--------|
| **Level 1** | Sessions 41-50 | 📝 Planned |
| **Level 2** | Sessions 51-60 | 📝 Planned |
| **Level 3** | Sessions 61-70 | 📝 Planned |
| **Level 4** | Sessions 71-80 | 📝 Planned |

**Total Sessions:** 80 (20 complete, 60 planned)

---

## 🔢 Problem ID Ranges

### 11-14 Age Group
| Level | Problem Range | Sessions | Problems per Session | Status |
|-------|---------------|----------|---------------------|--------|
| **Level 1** | 1-60 | 1-10 | 6 | ✅ Complete |
| **Level 2** | 61-120 | 11-20 | 6 | ✅ Complete |
| **Level 3** | 121-180 | 21-30 | 6 | 📝 Planned |
| **Level 4** | 181-240 | 31-40 | 6 | 📝 Planned |

### 15-18 Age Group
| Level | Problem Range | Sessions | Problems per Session | Status |
|-------|---------------|----------|---------------------|--------|
| **Level 1** | 241-300 | 41-50 | 6 | 📝 Planned |
| **Level 2** | 301-360 | 51-60 | 6 | 📝 Planned |
| **Level 3** | 361-420 | 61-70 | 6 | 📝 Planned |
| **Level 4** | 421-480 | 71-80 | 6 | 📝 Planned |

**Total Problems:** 480 (120 complete, 360 planned)

---

## 📁 File Organization Structure

### Scripts Directory

```
scripts/
├── seed-problems/
│   ├── 11-14/
│   │   ├── level-1/          # seed-problem-1.ts → seed-problem-60.ts
│   │   ├── level-2/          # seed-problem-61.ts → seed-problem-120.ts
│   │   ├── level-3/          # Placeholder (future)
│   │   └── level-4/          # Placeholder (future)
│   └── 15-18/
│       ├── level-1/          # Placeholder (future)
│       ├── level-2/          # Placeholder (future)
│       ├── level-3/          # Placeholder (future)
│       └── level-4/          # Placeholder (future)
│
├── seed-code-convergence/
│   ├── seed-code-convergence-11-14-L1.ts
│   ├── seed-code-convergence-11-14-L2.ts
│   └── [future: 15-18 levels]
│
├── seed-sessions/
│   └── seed-session-1-level2.ts
│
└── utilities/
    ├── check-session-5.ts
    └── clear-cache.ts
```

### Images Directory

```
public/images/
├── 11-14/
│   ├── level-1/
│   │   ├── mini-project/
│   │   └── sessions/
│   │       └── session-1/ through session-10/
│   ├── level-2/
│   │   ├── mini-project/
│   │   └── sessions/
│   │       └── session-1/ through session-10/
│   ├── level-3/              # Placeholder
│   └── level-4/              # Placeholder
│
└── 15-18/
    ├── level-1/              # Placeholder
    ├── level-2/              # Placeholder
    ├── level-3/
    └── level-4/              # Placeholder
```

### Frontend Routes

```
src/app/
├── levels/[age_group]/[level_number]/page.tsx
├── sessions/[session_id]/introduction/page.tsx
├── problems/[problem_id]/page.tsx
├── code-convergence/[age_group]/[level_number]/
│   ├── introduction/page.tsx
│   └── ultimate-challenge/page.tsx
└── compiler/page.tsx
```

---

## 📈 Current Progress (as of 2025-11-18)

### ✅ Completed Content

**11-14 Age Group - Level 1 (Sessions 1-10)**
- 10 sessions with introduction flashcards
- 60 problems (6 per session)
- 1 Code Convergence final task
- All images and assets

**11-14 Age Group - Level 2 (Sessions 11-20)**
- 10 sessions with introduction flashcards
- 60 problems (6 per session)
- 1 Code Convergence final task (Project ORBITRON)
- All images and assets

### 📝 Planned Content

**11-14 Age Group:**
- Level 3: 10 sessions, 60 problems
- Level 4: 10 sessions, 60 problems

**15-18 Age Group:**
- All 4 levels: 40 sessions, 240 problems

---

## 🎓 Difficulty Progression

| Level | Age Group | Difficulty | Concepts |
|-------|-----------|------------|----------|
| 1 | 11-14 | Intro/Easy | Variables, I/O, Conditionals, Loops, Lists, Functions |
| 2 | 11-14 | Easy/Medium | String methods, Built-in functions, Data structures |
| 3 | 11-14 | Medium | Object-oriented programming, File I/O |
| 4 | 11-14 | Medium/Hard | Advanced topics, Projects |
| 1 | 15-18 | Easy/Medium | Python fundamentals (accelerated) |
| 2 | 15-18 | Medium | Data structures, Algorithms |
| 3 | 15-18 | Medium/Hard | Advanced Python, Libraries |
| 4 | 15-18 | Hard | Professional projects, Frameworks |

---

## 🗺️ Content Navigation Map

### For 11-14 Age Group, Level 1, Session 5:
- **Session ID:** 5
- **Problem IDs:** 25-30 (6 problems)
- **Route:** `/sessions/5/introduction`
- **Images:** `public/images/11-14/level-1/sessions/session-5/`
- **Seed Script:** `scripts/seed-problems/11-14/level-1/seed-problem-25.ts` through `seed-problem-30.ts`

### For 11-14 Age Group, Level 2, Session 15:
- **Session ID:** 15
- **Problem IDs:** 85-90 (6 problems)
- **Route:** `/sessions/15/introduction`
- **Images:** `public/images/11-14/level-2/sessions/session-5/`
- **Seed Script:** `scripts/seed-problems/11-14/level-2/seed-problem-85.ts` through `seed-problem-90.ts`

---

## 🔍 Quick Reference Formulas

### Calculate Problem ID from Session:
```
For 11-14 Level 1: problem_id = (session_id - 1) * 6 + 1 to (session_id) * 6
For 11-14 Level 2: problem_id = ((session_id - 11) * 6) + 61 to ((session_id - 10) * 6) + 60
```

### Calculate Session from Problem ID:
```
For problems 1-60:    session_id = ceiling(problem_id / 6)
For problems 61-120:  session_id = ceiling((problem_id - 60) / 6) + 10
```

---

## 📞 Notes for Developers

1. **Never reuse IDs:** Session and Problem IDs are permanent once assigned
2. **Sequential ordering:** Problems within a session must be sequential
3. **Age group separation:** Content for 11-14 and 15-18 is completely separate
4. **Image naming:** Use consistent folder naming: `session-X` not `session_X`
5. **Seed script naming:** Always use format `seed-problem-{id}.ts`

---

**For questions or updates, please modify this document and update the timestamp.**
