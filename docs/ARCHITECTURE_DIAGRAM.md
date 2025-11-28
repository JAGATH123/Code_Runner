# Code Runner - System Architecture Documentation

## Table of Contents
1. [High-Level Architecture Overview](#high-level-architecture-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [Code Execution Pipeline](#code-execution-pipeline)
6. [Caching Strategy](#caching-strategy)
7. [Authentication & Authorization Flow](#authentication--authorization-flow)
8. [Data Flow Diagrams](#data-flow-diagrams)
9. [Deployment Architecture](#deployment-architecture)
10. [Component Interaction Diagrams](#component-interaction-diagrams)

---

## 1. High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CODE RUNNER PLATFORM                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   Student/Teacher    │         │   Admin Dashboard    │
│      Browser         │         │      Browser         │
└──────────┬───────────┘         └──────────┬───────────┘
           │                                 │
           │ HTTPS                          │ HTTPS
           │                                 │
           ▼                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS FRONTEND (SSR/CSR)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Home/Auth  │  │    Levels    │  │   Sessions   │  │   Problems   │  │
│  │     Pages    │  │    Pages     │  │    Pages     │  │    Pages     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Profile    │  │ Leaderboard  │  │   Contests   │  │   Mission    │  │
│  │     Page     │  │     Page     │  │     Page     │  │     Page     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                                       │
│  │   Teacher    │  │     3D       │                                       │
│  │  Dashboard   │  │  Characters  │                                       │
│  └──────────────┘  └──────────────┘                                       │
│                                                                             │
│  Components: React + TypeScript + Tailwind CSS + Three.js                 │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
                                │ API Calls (REST)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS API ROUTES (Backend)                         │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   /api/auth  │  │ /api/levels  │  │/api/sessions │  │/api/problems │  │
│  │    Login     │  │   Get All    │  │  Get by ID   │  │  Get by ID   │  │
│  │   Register   │  │ Get by Age   │  │   Update     │  │   Submit     │  │
│  │    Logout    │  │              │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  /api/user   │  │/api/progress │  │/api/execute  │  │/api/contests │  │
│  │   Profile    │  │   Update     │  │   Code Run   │  │   List/Join  │  │
│  │  Achievements│  │   Badges     │  │  Test Cases  │  │   Submit     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    │
│  │/api/teacher  │  │/api/leaderbd │  │/api/solutions│                    │
│  │  Dashboard   │  │   Rankings   │  │   Get/Vote   │                    │
│  │  Analytics   │  │   Update     │  │   Submit     │                    │
│  └──────────────┘  └──────────────┘  └──────────────┘                    │
│                                                                             │
│  Services: DataService, CacheService, AuthService                         │
└───┬─────────────┬─────────────┬─────────────┬─────────────┬───────────────┘
    │             │             │             │             │
    │             │             │             │             │
    ▼             ▼             ▼             ▼             ▼
┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
│MongoDB │   │ Redis  │   │ Docker │   │  S3/   │   │ Email  │
│Database│   │ Cache  │   │ Engine │   │  CDN   │   │Service │
│        │   │        │   │        │   │        │   │        │
└────────┘   └────────┘   └────────┘   └────────┘   └────────┘
```

---

## 2. Frontend Architecture

### 2.1 Next.js App Router Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page
│   ├── home/                     # Main dashboard
│   │   └── page.tsx
│   ├── auth/                     # Authentication pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── levels/                   # Training protocols
│   │   └── [age_group]/          # 11-14 or 15-18
│   │       ├── page.tsx          # Level selection
│   │       └── [level_number]/   # Level detail
│   │           └── page.tsx      # Session list
│   ├── sessions/                 # Session pages
│   │   └── [session_id]/
│   │       ├── introduction/     # Arena Warm-Up
│   │       │   └── page.tsx
│   │       └── cheat-sheet/      # Cheat Sheet
│   │           └── page.tsx
│   ├── problems/                 # Problem solving
│   │   └── [problem_id]/
│   │       └── page.tsx          # CompilerUI
│   ├── profile/                  # User profile
│   │   └── page.tsx
│   ├── leaderboard/              # Rankings
│   │   └── page.tsx
│   ├── contests/                 # Contests
│   │   ├── page.tsx              # Contest list
│   │   └── [contest_id]/
│   │       └── page.tsx          # Contest detail
│   ├── missions/                 # Story hub
│   │   └── page.tsx
│   ├── characters/               # 3D characters
│   │   └── page.tsx
│   ├── teacher/                  # Teacher dashboard
│   │   └── page.tsx
│   ├── compiler/                 # Standalone compiler
│   │   └── page.tsx
│   └── api/                      # API routes
│       ├── auth/
│       ├── levels/
│       ├── sessions/
│       ├── problems/
│       ├── execute/
│       ├── progress/
│       ├── leaderboard/
│       ├── contests/
│       ├── teacher/
│       └── solutions/
├── components/                   # React components
│   ├── Header.tsx
│   ├── CompilerUI.tsx
│   ├── LevelList.tsx
│   ├── SessionList.tsx
│   ├── ProblemList.tsx
│   ├── ProfileCard.tsx
│   ├── LeaderboardTable.tsx
│   ├── ContestCard.tsx
│   ├── BadgeDisplay.tsx
│   ├── AchievementCard.tsx
│   ├── ThreeJSViewer.tsx
│   └── ui/                       # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── contexts/                     # React contexts
│   ├── AudioContext.tsx
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/                        # Custom hooks
│   ├── usePageAudio.ts
│   ├── useAnimations.ts
│   ├── useAuth.ts
│   └── useProgress.ts
├── lib/                          # Utility libraries
│   ├── db-service-optimized.ts   # Database service
│   ├── data-service.ts           # Data access layer
│   ├── types.ts                  # TypeScript types
│   ├── imagePaths.ts             # Image path utilities
│   └── utils.ts                  # Misc utilities
└── styles/
    └── globals.css               # Global styles
```

### 2.2 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      Root Layout                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              AudioProvider                              │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │            AuthProvider                           │  │ │
│  │  │  ┌────────────────────────────────────────────┐  │  │ │
│  │  │  │         ThemeProvider                      │  │  │ │
│  │  │  │  ┌──────────────────────────────────────┐  │  │  │ │
│  │  │  │  │          Header                       │  │  │  │ │
│  │  │  │  └──────────────────────────────────────┘  │  │  │ │
│  │  │  │  ┌──────────────────────────────────────┐  │  │  │ │
│  │  │  │  │       Page Content                    │  │  │  │ │
│  │  │  │  │  ┌────────────────────────────────┐  │  │  │  │ │
│  │  │  │  │  │   Problem Page                 │  │  │  │  │ │
│  │  │  │  │  │  ┌──────────────────────────┐  │  │  │  │  │ │
│  │  │  │  │  │  │    CompilerUI            │  │  │  │  │  │ │
│  │  │  │  │  │  │  - Code Editor           │  │  │  │  │  │ │
│  │  │  │  │  │  │  - Test Cases Display    │  │  │  │  │  │ │
│  │  │  │  │  │  │  - Submit Button         │  │  │  │  │  │ │
│  │  │  │  │  │  └──────────────────────────┘  │  │  │  │  │ │
│  │  │  │  │  └────────────────────────────────┘  │  │  │  │ │
│  │  │  │  └──────────────────────────────────────┘  │  │  │ │
│  │  │  └────────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 State Management Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                           │
└──────────────────────────────────────────────────────────────┘

Global State (React Context):
┌────────────────────┐
│   AuthContext      │──────► User authentication state
│   - user           │        - Logged in user info
│   - isAuthenticated│        - Auth tokens
│   - login()        │        - Login/logout functions
│   - logout()       │
└────────────────────┘

┌────────────────────┐
│   AudioContext     │──────► Audio state management
│   - isPlaying      │        - Background music control
│   - volume         │        - Sound effects
│   - play()         │
│   - pause()        │
└────────────────────┘

┌────────────────────┐
│   ThemeContext     │──────► UI theme state
│   - theme          │        - Dark/light mode
│   - setTheme()     │        - Accessibility settings
└────────────────────┘

Component State (useState/useReducer):
- Form inputs
- UI toggles
- Temporary data
- Animation states

Server State (API + Cache):
- Problems, Sessions, Levels (cached in Redis)
- User progress (synced with MongoDB)
- Leaderboards (cached, periodic updates)
```

---

## 3. Backend Architecture

### 3.1 API Routes Structure

```
src/app/api/
├── auth/
│   ├── login/route.ts          # POST: User login
│   ├── register/route.ts       # POST: User registration
│   ├── logout/route.ts         # POST: User logout
│   └── verify/route.ts         # POST: Email verification
│
├── levels/
│   ├── route.ts                # GET: All levels
│   └── [age_group]/route.ts    # GET: Levels by age group
│
├── sessions/
│   └── [id]/route.ts           # GET: Session by ID
│
├── problems/
│   ├── [id]/route.ts           # GET: Problem by ID
│   └── [id]/submit/route.ts    # POST: Submit solution
│
├── execute/
│   └── route.ts                # POST: Execute Python code
│
├── user/
│   ├── profile/route.ts        # GET/PUT: User profile
│   └── progress/route.ts       # GET/PUT: User progress
│
├── leaderboard/
│   ├── route.ts                # GET: Global leaderboard
│   └── [age_group]/route.ts    # GET: Age group leaderboard
│
├── contests/
│   ├── route.ts                # GET: Contest list, POST: Create
│   ├── [id]/route.ts           # GET: Contest details
│   └── [id]/submit/route.ts    # POST: Submit to contest
│
├── solutions/
│   ├── [problem_id]/route.ts   # GET: Solutions for problem
│   └── [id]/vote/route.ts      # POST: Vote on solution
│
└── teacher/
    ├── dashboard/route.ts      # GET: Teacher analytics
    ├── students/route.ts       # GET: Student list
    └── [student_id]/route.ts   # GET: Individual student data
```

### 3.2 Service Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                             │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     DataService                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │   OptimizedDatabaseService (with Redis Caching)        │  │
│  │                                                          │  │
│  │   Methods:                                               │  │
│  │   - getAllLevels()                                       │  │
│  │   - getLevelsByAgeGroup(ageGroup)                       │  │
│  │   - getLevelByAgeGroupAndNumber(ageGroup, levelNumber)  │  │
│  │   - getSessionById(sessionId)                            │  │
│  │   - getProblemById(problemId)                            │  │
│  │   - getProblemsBySession(sessionId)                      │  │
│  │   - getTestCasesForProblem(problemId)                    │  │
│  │   - getUserProgress(userId, ageGroup)                    │  │
│  │   - updateUserProgress(progress)                         │  │
│  │   - invalidateCache(type, id)                            │  │
│  │   - getCacheStats()                                      │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     AuthService                               │
│  - registerUser(email, password)                              │
│  - loginUser(email, password)                                 │
│  - verifyToken(token)                                         │
│  - resetPassword(email)                                       │
│  - updatePassword(userId, newPassword)                        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   ExecutionService                            │
│  - executeCode(code, testCases, language)                     │
│  - validateCode(code)                                         │
│  - getExecutionStatus(executionId)                            │
│  - killExecution(executionId)                                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   ProgressService                             │
│  - updateProgress(userId, problemId, status)                  │
│  - calculateXP(problemDifficulty, attempts)                   │
│  - unlockAchievement(userId, achievementId)                   │
│  - updateStreak(userId)                                       │
│  - calculateRank(userId)                                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  LeaderboardService                           │
│  - updateLeaderboard(userId, xp)                              │
│  - getGlobalLeaderboard(page, limit)                          │
│  - getAgeGroupLeaderboard(ageGroup, page, limit)              │
│  - getUserRank(userId)                                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema

### 4.1 MongoDB Collections

```
CODE_RUNNER_DB
│
├── users
│   ├── _id: ObjectId
│   ├── email: string (unique, indexed)
│   ├── password_hash: string
│   ├── username: string (unique)
│   ├── age_group: '11-14' | '15-18'
│   ├── role: 'student' | 'teacher' | 'admin'
│   ├── created_at: Date
│   ├── updated_at: Date
│   └── email_verified: boolean
│
├── levels
│   ├── _id: ObjectId
│   ├── level_id: number (unique, indexed)
│   ├── level_number: number (1-4)
│   ├── age_group: '11-14' | '15-18'
│   ├── title: string
│   ├── description: string
│   └── created_at: Date
│
├── sessions
│   ├── _id: ObjectId
│   ├── session_id: number (unique, indexed)
│   ├── level_id: number (indexed)
│   ├── session_number: number (1-10)
│   ├── title: string
│   ├── description: string
│   ├── introduction_content: string
│   └── created_at: Date
│
├── problems
│   ├── _id: ObjectId
│   ├── problem_id: number (unique, indexed)
│   ├── session_id: number (indexed)
│   ├── title: string
│   ├── description: string
│   ├── question: string
│   ├── objectives: string
│   ├── concepts: string
│   ├── difficulty: 'Intro' | 'Easy' | 'Medium' | 'Hard'
│   ├── estimated_minutes: number
│   ├── example_code: string
│   ├── sample_input: string
│   ├── sample_output: string
│   ├── age_group: '11-14' | '15-18'
│   ├── level_number: number
│   ├── case_number: number
│   ├── case_title: string
│   ├── case_overview: string
│   ├── case_code: string
│   ├── case_explanation: string
│   └── created_at: Date
│
├── testcases
│   ├── _id: ObjectId
│   ├── problem_id: number (indexed)
│   ├── input: string
│   ├── expected_output: string
│   ├── is_hidden: boolean
│   ├── is_sample: boolean
│   └── created_at: Date
│
├── user_progress
│   ├── _id: ObjectId
│   ├── user_id: ObjectId (indexed)
│   ├── age_group: '11-14' | '15-18'
│   ├── current_level: number
│   ├── current_session: number
│   ├── experience_points: number
│   ├── rank: string
│   ├── streak: {
│   │   current: number
│   │   longest: number
│   │   last_submission_date: Date
│   │   }
│   ├── completed_problems: [number]
│   ├── achievements: [ObjectId]
│   ├── badges: [ObjectId]
│   ├── stats: {
│   │   total_solved: number
│   │   by_difficulty: { intro, easy, medium, hard }
│   │   total_submissions: number
│   │   success_rate: number
│   │   average_time: number
│   │   }
│   ├── submission_calendar: [{ date, count, problems }]
│   └── updated_at: Date
│
├── submissions
│   ├── _id: ObjectId
│   ├── submission_id: string (unique, indexed)
│   ├── user_id: ObjectId (indexed)
│   ├── problem_id: number (indexed)
│   ├── code: string
│   ├── language: 'python'
│   ├── status: 'Accepted' | 'Wrong Answer' | 'Error' | 'TLE'
│   ├── test_results: [{
│   │   test_case_id: ObjectId
│   │   passed: boolean
│   │   input: string
│   │   expected: string
│   │   actual: string
│   │   execution_time: number
│   │   }]
│   ├── execution_time: number
│   ├── memory_used: number
│   ├── submitted_at: Date
│   └── created_at: Date
│
├── solutions
│   ├── _id: ObjectId
│   ├── solution_id: string (unique)
│   ├── problem_id: number (indexed)
│   ├── author_id: ObjectId
│   ├── title: string
│   ├── approach: string
│   ├── code: string
│   ├── explanation: string (markdown)
│   ├── complexity: { time: string, space: string }
│   ├── upvotes: number
│   ├── downvotes: number
│   ├── is_official: boolean
│   ├── created_at: Date
│   └── updated_at: Date
│
├── achievements
│   ├── _id: ObjectId
│   ├── achievement_id: string (unique)
│   ├── name: string
│   ├── description: string
│   ├── icon_url: string
│   ├── rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
│   ├── category: 'Progress' | 'Speed' | 'Streak' | 'Special'
│   ├── unlock_criteria: object
│   └── created_at: Date
│
├── badges
│   ├── _id: ObjectId
│   ├── badge_id: string (unique)
│   ├── name: string
│   ├── description: string
│   ├── icon_url: string
│   ├── type: 'Level' | 'Session' | 'Achievement'
│   └── created_at: Date
│
├── contests
│   ├── _id: ObjectId
│   ├── contest_id: string (unique, indexed)
│   ├── title: string
│   ├── description: string
│   ├── start_time: Date
│   ├── end_time: Date
│   ├── duration_minutes: number
│   ├── problems: [number]
│   ├── participants: [ObjectId]
│   ├── status: 'upcoming' | 'active' | 'completed'
│   ├── created_at: Date
│   └── updated_at: Date
│
├── contest_submissions
│   ├── _id: ObjectId
│   ├── contest_id: string (indexed)
│   ├── user_id: ObjectId (indexed)
│   ├── problem_id: number
│   ├── submission_id: ObjectId
│   ├── points: number
│   ├── penalty_time: number
│   └── submitted_at: Date
│
├── teachers
│   ├── _id: ObjectId
│   ├── user_id: ObjectId (indexed)
│   ├── classes: [{
│   │   class_id: string
│   │   name: string
│   │   students: [ObjectId]
│   │   assigned_problems: [number]
│   │   created_at: Date
│   │   }]
│   └── created_at: Date
│
└── leaderboard
    ├── _id: ObjectId
    ├── user_id: ObjectId (unique, indexed)
    ├── username: string
    ├── age_group: '11-14' | '15-18'
    ├── total_xp: number (indexed, desc)
    ├── problems_solved: number
    ├── success_rate: number
    ├── current_streak: number
    ├── rank: number
    └── updated_at: Date
```

### 4.2 Database Indexes

```
Indexes for Performance Optimization:

users:
  - { email: 1 } (unique)
  - { username: 1 } (unique)
  - { age_group: 1, created_at: -1 }

levels:
  - { level_id: 1 } (unique)
  - { age_group: 1, level_number: 1 }

sessions:
  - { session_id: 1 } (unique)
  - { level_id: 1, session_number: 1 }

problems:
  - { problem_id: 1 } (unique)
  - { session_id: 1 }
  - { age_group: 1, level_number: 1 }

testcases:
  - { problem_id: 1 }
  - { problem_id: 1, is_hidden: 1 }

user_progress:
  - { user_id: 1 } (unique)
  - { experience_points: -1 }

submissions:
  - { submission_id: 1 } (unique)
  - { user_id: 1, submitted_at: -1 }
  - { problem_id: 1, submitted_at: -1 }

solutions:
  - { solution_id: 1 } (unique)
  - { problem_id: 1, upvotes: -1 }

contests:
  - { contest_id: 1 } (unique)
  - { status: 1, start_time: -1 }

contest_submissions:
  - { contest_id: 1, user_id: 1 }
  - { contest_id: 1, points: -1 }

leaderboard:
  - { user_id: 1 } (unique)
  - { age_group: 1, total_xp: -1 }
  - { total_xp: -1 }
```

---

## 5. Code Execution Pipeline

### 5.1 Execution Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      CODE EXECUTION PIPELINE                              │
└──────────────────────────────────────────────────────────────────────────┘

User submits code
       │
       ▼
┌─────────────────┐
│  CompilerUI     │ 1. Capture user code
│  (Frontend)     │ 2. Display loading state
└────────┬────────┘
         │
         │ POST /api/execute
         │ { code, problemId, language }
         ▼
┌─────────────────────────┐
│  /api/execute/route.ts  │ 3. Validate request
│  (API Route)            │ 4. Get test cases from DB
└────────┬────────────────┘
         │
         │ Call ExecutionService
         ▼
┌─────────────────────────┐
│  ExecutionService       │ 5. Validate code syntax
│  (Backend Service)      │ 6. Prepare Docker container
└────────┬────────────────┘
         │
         │ Spawn Docker container
         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DOCKER CONTAINER                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  1. Create isolated Python environment                │  │
│  │  2. Install required packages (if needed)             │  │
│  │  3. Write user code to temp file                      │  │
│  │  4. For each test case:                               │  │
│  │     a. Execute: python user_code.py < input.txt       │  │
│  │     b. Capture stdout, stderr                         │  │
│  │     c. Measure execution time and memory              │  │
│  │     d. Compare output with expected                   │  │
│  │     e. Handle matplotlib plots (save as base64)       │  │
│  │  5. Cleanup temp files                                │  │
│  │  6. Return results                                    │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  Resource Limits:                                             │
│  - CPU: 1 core                                                │
│  - Memory: 512MB                                              │
│  - Timeout: 30 seconds per test case                          │
│  - Network: Isolated (no internet)                            │
└────────┬──────────────────────────────────────────────────────┘
         │
         │ Return execution results
         ▼
┌─────────────────────────┐
│  ExecutionService       │ 7. Process results
│  (Backend Service)      │ 8. Calculate score
└────────┬────────────────┘    9. Update user progress (if accepted)
         │
         │ Return response
         ▼
┌─────────────────────────┐
│  /api/execute/route.ts  │ 10. Format response
│  (API Route)            │ 11. Save submission to DB
└────────┬────────────────┘
         │
         │ JSON response
         │ { status, test_results, execution_time, plots }
         ▼
┌─────────────────┐
│  CompilerUI     │ 12. Display results
│  (Frontend)     │     - Test case pass/fail
└─────────────────┘     - Execution time
                        - Error messages
                        - Plot images
```

### 5.2 Docker Container Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    DOCKER EXECUTION ENVIRONMENT                 │
└────────────────────────────────────────────────────────────────┘

Docker Host (Separate Server)
│
├── Docker Engine
│   │
│   ├── Base Image: python:3.11-slim
│   │   ├── Python 3.11
│   │   ├── pip
│   │   ├── matplotlib (for plotting)
│   │   ├── numpy
│   │   └── pandas
│   │
│   └── Execution Container (spawned per request)
│       ├── /app/
│       │   ├── user_code.py        # User's submitted code
│       │   ├── test_input.txt      # Test case input
│       │   └── output.txt          # Captured output
│       │
│       ├── Resource Limits:
│       │   ├── --cpus="1.0"        # 1 CPU core
│       │   ├── --memory="512m"     # 512MB RAM
│       │   └── --network="none"    # No network access
│       │
│       └── Security:
│           ├── Read-only filesystem (except /app)
│           ├── No root privileges
│           ├── Restricted syscalls
│           └── Auto-cleanup after execution
│
└── API Endpoint (Express/Next.js)
    ├── POST /execute
    │   ├── Validates code
    │   ├── Spawns container
    │   ├── Monitors execution
    │   └── Returns results
    │
    └── GET /status/:execution_id
        └── Check execution status
```

### 5.3 Execution Result Schema

```typescript
interface ExecutionResult {
  status: 'Success' | 'Error' | 'Timeout' | 'Memory Limit Exceeded'
  stdout: string
  stderr: string
  execution_time: number      // milliseconds
  memory_used: number          // MB
  plots: string[]              // base64 encoded images
  test_results: [
    {
      test_case_id: string
      passed: boolean
      input: string
      expected_output: string
      actual_output: string
      execution_time: number
      error_message?: string
    }
  ]
  total_passed: number
  total_tests: number
}
```

---

## 6. Caching Strategy

### 6.1 Redis Caching Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      REDIS CACHE LAYER                           │
└─────────────────────────────────────────────────────────────────┘

Cache Keys Structure:
│
├── level:{age_group}:{level_number}
│   └── TTL: 4 hours (14400 seconds)
│   └── Data: Complete level with sessions and problems
│
├── levels:{age_group}
│   └── TTL: 4 hours
│   └── Data: All levels for age group
│
├── session:{session_id}
│   └── TTL: 2 hours (7200 seconds)
│   └── Data: Session with problems
│
├── problem:{problem_id}
│   └── TTL: 2 hours
│   └── Data: Problem details
│
├── testcases:{problem_id}
│   └── TTL: 2 hours
│   └── Data: All test cases for problem
│
├── progress:{user_id}:{age_group}
│   └── TTL: 30 minutes (1800 seconds)
│   └── Data: User progress data
│
├── leaderboard:global
│   └── TTL: 15 minutes (900 seconds)
│   └── Data: Sorted set of top 100 users by XP
│
├── leaderboard:{age_group}
│   └── TTL: 15 minutes
│   └── Data: Age group specific leaderboard
│
└── user:rank:{user_id}
    └── TTL: 15 minutes
    └── Data: User's current rank position
```

### 6.2 Cache Invalidation Strategy

```
Cache Invalidation Events:

Problem/Session/Level Updates:
  → Invalidate: problem:*, session:*, level:*

User Progress Update:
  → Invalidate: progress:{user_id}:*
  → Invalidate: leaderboard:* (if XP changed)
  → Invalidate: user:rank:{user_id}

New Submission Accepted:
  → Invalidate: progress:{user_id}:*
  → Update: leaderboard:* (increment score)

Contest Starts/Ends:
  → Invalidate: contest:{contest_id}
  → Invalidate: leaderboard:contest:{contest_id}

Manual Cache Clear:
  → Admin API endpoint: POST /api/admin/cache/clear
```

### 6.3 Cache-Aside Pattern Implementation

```
┌────────────────────────────────────────────────────────────┐
│              CACHE-ASIDE PATTERN FLOW                       │
└────────────────────────────────────────────────────────────┘

Read Request:
  1. Check Redis cache
  2. If HIT → Return cached data
  3. If MISS →
     a. Query MongoDB
     b. Store result in Redis with TTL
     c. Return data

Write Request:
  1. Update MongoDB
  2. Invalidate Redis cache key
  3. Next read will populate cache

Example (getProblemById):

async getProblemById(id) {
  const cacheKey = `problem:${id}`;

  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Cache miss - query DB
  const problem = await mongodb.problems.findOne({ problem_id: id });

  // Store in cache
  await redis.set(cacheKey, JSON.stringify(problem), 'EX', 7200);

  return problem;
}
```

---

## 7. Authentication & Authorization Flow

### 7.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION FLOW                             │
└─────────────────────────────────────────────────────────────────┘

Registration:
  User submits email/password
         │
         ▼
  POST /api/auth/register
         │
         ├─→ Validate input
         ├─→ Check if email exists
         ├─→ Hash password (bcrypt)
         ├─→ Create user in MongoDB
         ├─→ Send verification email
         └─→ Return success (no token yet)

Login:
  User submits email/password
         │
         ▼
  POST /api/auth/login
         │
         ├─→ Find user by email
         ├─→ Compare password hash
         ├─→ Generate JWT token
         │   ├─→ Payload: { userId, email, role }
         │   ├─→ Secret: process.env.JWT_SECRET
         │   └─→ Expiry: 7 days
         ├─→ Set HTTP-only cookie
         └─→ Return { user, token }

Authenticated Requests:
  User makes API request
         │
         ▼
  Middleware: verifyToken()
         │
         ├─→ Extract token from cookie/header
         ├─→ Verify JWT signature
         ├─→ Decode payload
         ├─→ Attach user to request
         └─→ Continue to route handler

Logout:
  User clicks logout
         │
         ▼
  POST /api/auth/logout
         │
         └─→ Clear HTTP-only cookie
```

### 7.2 Authorization Levels

```
┌─────────────────────────────────────────────────────────────────┐
│                  ROLE-BASED ACCESS CONTROL                       │
└─────────────────────────────────────────────────────────────────┘

Roles:
├── Student
│   ├── View levels, sessions, problems
│   ├── Submit solutions
│   ├── View own profile and progress
│   ├── Participate in contests
│   └── View leaderboard
│
├── Teacher
│   ├── All student permissions
│   ├── View teacher dashboard
│   ├── See class analytics
│   ├── View student progress
│   └── Export reports
│
└── Admin
    ├── All teacher permissions
    ├── Create/edit problems
    ├── Manage users
    ├── Create contests
    └── System configuration

Authorization Middleware:

requireRole(role) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.role !== role && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  }
}

Usage:
  app.get('/api/teacher/dashboard',
    verifyToken,
    requireRole('teacher'),
    handler
  );
```

---

## 8. Data Flow Diagrams

### 8.1 Problem Solving Flow

```
┌────────────────────────────────────────────────────────────────┐
│              PROBLEM SOLVING DATA FLOW                          │
└────────────────────────────────────────────────────────────────┘

[User] ──────────────────────────────────────────────────────────┐
   │                                                              │
   │ 1. Navigate to problem                                       │
   │                                                              │
   ▼                                                              │
[Frontend: Problem Page]                                          │
   │                                                              │
   │ 2. GET /api/problems/{id}                                    │
   │                                                              │
   ▼                                                              │
[API Route: /api/problems/[id]]                                   │
   │                                                              │
   │ 3. Call DataService.getProblemById()                         │
   │                                                              │
   ▼                                                              │
[DataService] ──→ [Redis Cache] ──(cache miss)──→ [MongoDB]      │
   │                    │                                         │
   │ ←──(cache hit)────┘                                         │
   │                                                              │
   │ 4. Return problem data                                       │
   │                                                              │
   ▼                                                              │
[Frontend: Display Problem]                                       │
   │                                                              │
   │ 5. User writes code                                          │
   │ 6. User clicks "Run Code"                                    │
   │                                                              │
   │ 7. POST /api/execute                                         │
   │    { code, problemId, language: 'python' }                   │
   │                                                              │
   ▼                                                              │
[API Route: /api/execute]                                         │
   │                                                              │
   │ 8. Get test cases from DB                                    │
   │ 9. Call ExecutionService                                     │
   │                                                              │
   ▼                                                              │
[ExecutionService]                                                │
   │                                                              │
   │ 10. Spawn Docker container                                   │
   │                                                              │
   ▼                                                              │
[Docker Container] ──→ Execute code ──→ Return results            │
   │                                                              │
   ▼                                                              │
[ExecutionService]                                                │
   │                                                              │
   │ 11. Process results                                          │
   │ 12. Calculate pass/fail                                      │
   │                                                              │
   ▼                                                              │
[API Route: /api/execute]                                         │
   │                                                              │
   │ 13. If all tests passed:                                     │
   │     - Save submission to DB                                  │
   │     - Update user progress                                   │
   │     - Award XP                                               │
   │     - Check for achievements                                 │
   │     - Update leaderboard                                     │
   │                                                              │
   │ 14. Return execution results                                 │
   │                                                              │
   ▼                                                              │
[Frontend: Display Results] ─────────────────────────────────────┘
   │
   │ 15. Show test case results
   │ 16. Show XP earned (if accepted)
   │ 17. Unlock next problem
   │
   └──→ [User continues]
```

### 8.2 Progress Tracking Flow

```
┌────────────────────────────────────────────────────────────────┐
│              PROGRESS TRACKING DATA FLOW                        │
└────────────────────────────────────────────────────────────────┘

User solves problem successfully
         │
         ▼
POST /api/progress/update
  { userId, problemId, status: 'Accepted', executionTime }
         │
         ▼
ProgressService.updateProgress()
         │
         ├──→ Calculate XP (based on difficulty, attempts)
         │    - Intro: 10 XP
         │    - Easy: 20 XP
         │    - Medium: 30 XP
         │    - Hard: 50 XP
         │    - First attempt bonus: +50%
         │    - Hint penalty: -20%
         │
         ├──→ Update user_progress in MongoDB
         │    - Add to completed_problems array
         │    - Increment total_solved
         │    - Increment difficulty counter
         │    - Update success_rate
         │    - Add to submission_calendar
         │
         ├──→ Update streak
         │    - Check last_submission_date
         │    - If consecutive day: increment
         │    - If broken: reset to 1
         │    - Update longest_streak if needed
         │
         ├──→ Check achievements
         │    - First problem solved
         │    - 10 problems milestone
         │    - 50 problems milestone
         │    - 100 problems milestone
         │    - Perfect streak (7 days)
         │    - Speed demon (solve in < 5 min)
         │    - etc.
         │
         ├──→ Update rank
         │    - Calculate based on total XP
         │    - Novice: 0-500 XP
         │    - Advanced: 501-1500 XP
         │    - Expert: 1501-3000 XP
         │    - Master: 3001+ XP
         │
         ├──→ Update leaderboard
         │    - Invalidate Redis cache
         │    - Update MongoDB leaderboard collection
         │    - Update Redis sorted set
         │
         └──→ Return updated progress
                │
                ▼
         Frontend updates UI
                │
                ├──→ Show XP gained animation
                ├──→ Show achievement unlocked (if any)
                ├──→ Update progress bar
                ├──→ Update streak counter
                └──→ Show new rank (if changed)
```

### 8.3 Leaderboard Update Flow

```
┌────────────────────────────────────────────────────────────────┐
│              LEADERBOARD UPDATE FLOW                            │
└────────────────────────────────────────────────────────────────┘

User earns XP
         │
         ▼
LeaderboardService.updateLeaderboard(userId, xpGained)
         │
         ├──→ Get current user from leaderboard collection
         │
         ├──→ Update MongoDB
         │    UPDATE leaderboard
         │    SET total_xp = total_xp + xpGained,
         │        problems_solved = problems_solved + 1,
         │        updated_at = NOW()
         │    WHERE user_id = userId
         │
         ├──→ Update Redis Sorted Set
         │    ZINCRBY leaderboard:global xpGained userId
         │    ZINCRBY leaderboard:{age_group} xpGained userId
         │
         ├──→ Invalidate cache
         │    DEL leaderboard:global
         │    DEL leaderboard:{age_group}
         │    DEL user:rank:{userId}
         │
         └──→ Recalculate ranks (background job)
              - Run periodically (every 5 minutes)
              - Update rank field in leaderboard collection
              - Cache top 100 in Redis

Viewing Leaderboard:
         │
         ▼
GET /api/leaderboard?age_group={age_group}&page=1&limit=50
         │
         ▼
LeaderboardService.getAgeGroupLeaderboard()
         │
         ├──→ Check Redis cache
         │    GET leaderboard:{age_group}:page:{page}
         │
         ├──→ If cache miss:
         │    - Query MongoDB with pagination
         │    - Cache result in Redis (TTL: 15 min)
         │
         └──→ Return leaderboard data
              [
                { rank, userId, username, totalXP, problemsSolved, ... },
                ...
              ]
```

---

## 9. Deployment Architecture

### 9.1 Production Infrastructure

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PRODUCTION ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────────────┘

                           INTERNET
                              │
                              │ HTTPS (Port 443)
                              │
                              ▼
                    ┌──────────────────┐
                    │  Load Balancer   │
                    │   (AWS ALB or    │
                    │   Vercel Edge)   │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │  Next.js   │  │  Next.js   │  │  Next.js   │
    │  Instance  │  │  Instance  │  │  Instance  │
    │     #1     │  │     #2     │  │     #3     │
    └──────┬─────┘  └──────┬─────┘  └──────┬─────┘
           │                │                │
           └────────────────┼────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌──────────────┐ ┌────────────┐ ┌──────────────┐
    │   MongoDB    │ │   Redis    │ │   Docker     │
    │   Cluster    │ │   Cluster  │ │   Executor   │
    │  (Atlas)     │ │  (Cloud)   │ │   Server     │
    └──────────────┘ └────────────┘ └──────────────┘
              │             │             │
              │             │             │
    ┌─────────┴─────────────┴─────────────┴─────────┐
    │                                                 │
    ▼                                                 ▼
┌──────────────┐                            ┌──────────────┐
│     CDN      │                            │  Monitoring  │
│   (Images,   │                            │   - Sentry   │
│   Videos)    │                            │   - Datadog  │
└──────────────┘                            │   - Uptime   │
                                            └──────────────┘
```

### 9.2 Component Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                  DEPLOYMENT COMPONENTS                           │
└─────────────────────────────────────────────────────────────────┘

Frontend + API (Next.js):
├── Platform: Vercel (recommended) or AWS ECS
├── Instances: 3+ (auto-scaling)
├── Region: Multi-region (US, EU, Asia)
├── CDN: Vercel Edge or CloudFront
└── Environment Variables:
    ├── DATABASE_URL (MongoDB connection string)
    ├── REDIS_URL (Redis connection string)
    ├── JWT_SECRET
    ├── DOCKER_EXECUTOR_URL
    └── EMAIL_SERVICE_API_KEY

Database (MongoDB):
├── Service: MongoDB Atlas
├── Tier: M10 (Dedicated)
├── Region: Same as app servers
├── Backup: Automated daily
├── Replication: 3-node replica set
└── Connection: TLS/SSL encrypted

Cache (Redis):
├── Service: Redis Cloud or AWS ElastiCache
├── Tier: 100MB+ memory
├── Persistence: AOF enabled
├── Eviction: LRU policy
└── Connection: TLS encrypted

Docker Executor:
├── Platform: Dedicated Linux server (DigitalOcean/AWS EC2)
├── Specs: 4 CPU cores, 8GB RAM
├── Docker Version: 24+
├── API: Express.js REST API
├── Security: Firewall, rate limiting
└── Monitoring: Resource usage, container metrics

Static Assets (Images/Videos):
├── Storage: AWS S3 or Cloudinary
├── CDN: CloudFront or Cloudinary CDN
├── Optimization: Auto-resize, compression
└── Security: Signed URLs (optional)

Email Service:
├── Provider: SendGrid or AWS SES
├── Purpose: Verification, password reset, notifications
└── Templates: Transactional email templates
```

### 9.3 CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    CI/CD WORKFLOW                                │
└─────────────────────────────────────────────────────────────────┘

GitHub Repository
        │
        │ Push to main branch
        ▼
GitHub Actions Workflow
        │
        ├──→ Stage 1: Code Quality
        │    ├── ESLint (JavaScript/TypeScript linting)
        │    ├── Prettier (Code formatting)
        │    └── TypeScript compiler check
        │
        ├──→ Stage 2: Testing
        │    ├── Unit tests (Jest)
        │    ├── Integration tests
        │    └── E2E tests (Playwright)
        │
        ├──→ Stage 3: Build
        │    ├── npm install
        │    ├── next build
        │    └── Build Docker images
        │
        ├──→ Stage 4: Security Scan
        │    ├── npm audit
        │    ├── Snyk vulnerability scan
        │    └── Docker image scan
        │
        └──→ Stage 5: Deploy
             │
             ├──→ Staging Environment
             │    ├── Deploy to staging
             │    ├── Run smoke tests
             │    └── Manual approval
             │
             └──→ Production Environment
                  ├── Deploy to production
                  ├── Health checks
                  ├── Notify team (Slack/Email)
                  └── Rollback on failure

Rollback Strategy:
- Keep last 3 deployments
- One-click rollback
- Automated rollback on error threshold
```

---

## 10. Component Interaction Diagrams

### 10.1 User Registration & Login

```
┌─────────────────────────────────────────────────────────────────┐
│              USER REGISTRATION SEQUENCE                          │
└─────────────────────────────────────────────────────────────────┘

User          Frontend        API Route       AuthService    Database
 │                │               │                │            │
 │ Fill form      │               │                │            │
 │───────────────>│               │                │            │
 │                │               │                │            │
 │ Click register │               │                │            │
 │───────────────>│               │                │            │
 │                │ POST /auth/   │                │            │
 │                │  register     │                │            │
 │                │──────────────>│                │            │
 │                │               │ Validate input │            │
 │                │               │───────────────>│            │
 │                │               │                │ Check email│
 │                │               │                │ exists     │
 │                │               │                │───────────>│
 │                │               │                │<───────────│
 │                │               │                │ not exists │
 │                │               │ Hash password  │            │
 │                │               │───────────────>│            │
 │                │               │<───────────────│            │
 │                │               │                │ Create user│
 │                │               │                │───────────>│
 │                │               │                │<───────────│
 │                │               │ Send verify    │            │
 │                │               │ email          │            │
 │                │               │───────────────>│            │
 │                │<──────────────│                │            │
 │<───────────────│ Success msg   │                │            │
 │                │               │                │            │


┌─────────────────────────────────────────────────────────────────┐
│                    USER LOGIN SEQUENCE                           │
└─────────────────────────────────────────────────────────────────┘

User          Frontend        API Route       AuthService    Database
 │                │               │                │            │
 │ Enter creds    │               │                │            │
 │───────────────>│               │                │            │
 │                │ POST /auth/   │                │            │
 │                │  login        │                │            │
 │                │──────────────>│                │            │
 │                │               │ Find user by   │            │
 │                │               │ email          │            │
 │                │               │───────────────>│            │
 │                │               │                │ Query DB   │
 │                │               │                │───────────>│
 │                │               │                │<───────────│
 │                │               │<───────────────│ user found │
 │                │               │ Compare        │            │
 │                │               │ password hash  │            │
 │                │               │───────────────>│            │
 │                │               │<───────────────│ match      │
 │                │               │ Generate JWT   │            │
 │                │               │───────────────>│            │
 │                │               │<───────────────│ token      │
 │                │               │ Set cookie     │            │
 │                │<──────────────│ Return token   │            │
 │<───────────────│ Redirect to   │                │            │
 │                │ dashboard     │                │            │
```

### 10.2 Problem Submission Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              PROBLEM SUBMISSION SEQUENCE                         │
└─────────────────────────────────────────────────────────────────┘

User    Frontend   API Route  ExecutionService  Docker  ProgressService  DB
 │         │           │              │            │           │         │
 │ Write   │           │              │            │           │         │
 │ code    │           │              │            │           │         │
 │────────>│           │              │            │           │         │
 │         │           │              │            │           │         │
 │ Submit  │           │              │            │           │         │
 │────────>│ POST      │              │            │           │         │
 │         │ /execute  │              │            │           │         │
 │         │──────────>│ Get test     │            │           │         │
 │         │           │ cases        │            │           │         │
 │         │           │──────────────────────────────────────────────>│
 │         │           │<─────────────────────────────────────────────│
 │         │           │              │            │           │         │
 │         │           │ Execute code │            │           │         │
 │         │           │─────────────>│ Spawn      │           │         │
 │         │           │              │ container  │           │         │
 │         │           │              │───────────>│           │         │
 │         │           │              │            │ Run code  │         │
 │         │           │              │            │───────┐   │         │
 │         │           │              │            │       │   │         │
 │         │           │              │            │<──────┘   │         │
 │         │           │              │<───────────│ Results   │         │
 │         │           │<─────────────│            │           │         │
 │         │           │              │            │           │         │
 │         │           │ If accepted  │            │           │         │
 │         │           │─────────────────────────────────────>│         │
 │         │           │              │            │ Update    │         │
 │         │           │              │            │ progress  │         │
 │         │           │              │            │──────────────────>│
 │         │           │              │            │           │<───────│
 │         │           │              │            │<──────────│         │
 │         │<──────────│ Return       │            │           │         │
 │<────────│ results   │              │            │           │         │
 │         │           │              │            │           │         │
 │ Display │           │              │            │           │         │
 │ results │           │              │            │           │         │
```

---

## Summary

This architecture document provides a comprehensive view of the Code Runner system, including:

1. **High-level architecture** with all major components
2. **Frontend structure** using Next.js 15 App Router
3. **Backend API routes** and service layer
4. **Database schema** with MongoDB collections and indexes
5. **Code execution pipeline** using Docker containers
6. **Redis caching strategy** for performance optimization
7. **Authentication and authorization** flows
8. **Data flow diagrams** for key operations
9. **Deployment architecture** for production
10. **Component interaction** sequence diagrams

All diagrams use ASCII art for easy viewing in any text editor and can be used as reference during development.

---

**Document Version**: 1.0
**Last Updated**: November 2025
**Prepared By**: Development Team
**Status**: Technical Documentation
