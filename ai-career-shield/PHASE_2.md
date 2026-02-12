# AI Career Shield - Phase 2 Product Evolution

> **Guiding Principle:** "Monthly is for progress + updates; one-time is for the roadmap."

---

## Overview

Phase 2 transforms AI Career Shield from a one-time assessment into a subscription product with recurring value through progress tracking, weekly updates, and personalized guidance.

---

## 1. Dual-Audience Strategy

### One Engine, Two Packaging Layers

**Shared Core:**

- Assessment → Drivers → Adjacencies → 30/60/90 Plan
- Evidence-based risk factors
- Role Task Library (curated data)

**Student Packaging:**

- "Top paths to explore" (3-5 options)
- "Next semester plan" (courses/skills/projects)
- "Internship + portfolio project ideas"
- Major selection guidance

**Professional Packaging:**

- "Pivot roles" (3-5 adjacent careers)
- "30-day execution plan" (portfolio + networking + applications)
- "Resume bullets + interview focus areas"
- Career transition roadmap

### Implementation: Simple Fork in Step 1

Add one required field to assessment:

```typescript
audience: 'student' | 'professional'
```

**UI:**

```
"I'm a…" (required)
○ Student / Recent grad
○ Working professional

Helper text: "Your roadmap will be tailored to your context 
(semester plan vs job transition plan)."
```

---

## 2. Enhanced Assessment Fields

### New Fields for Better Personalization

```typescript
interface AssessmentInput {
  // Existing
  jobTitle: string;
  industry: string;
  skills: string[];
  
  // New in Phase 2
  audience: 'student' | 'professional';
  goal: 'choose_direction' | 'future_proof' | 'pivot';
  experienceLevel: string; // Year 1-4 for students, 0-2/3-5/6-10/10+ for pros
  enjoys?: string[]; // 2-3 picks: building, writing, helping, analysis, design, leading
}
```

**Why these fields:**

- `audience` → Changes output packaging
- `goal` → Tailors recommendations
- `experienceLevel` → Adjusts timeline expectations
- `enjoys` → Dramatically improves role adjacency quality

---

## 3. Subscription Value Loop

### Why Monthly Makes Sense

**Problem:** One-time assessment = one-time value = no recurring revenue

**Solution:** Add ongoing delta through:

1. **Progress + Accountability**
   - Weekly plan refresh ("This week's tasks")
   - Milestone tracking
   - Streak system
   - Check-in reminders

2. **Updates When World Changes**
   - AI/tooling shifts tracked
   - Role adjacencies refreshed based on trends
   - Risk drivers updated as capabilities evolve

3. **Personalization Improves Over Time**
   - Users add: projects completed, new skills, portfolio links
   - Recommendations get sharper
   - Plan adapts to progress

4. **Templates + Outputs**
   - Resume bullets tailored to target roles
   - Cover letter generator
   - Interview question banks
   - Portfolio project briefs

### What to Build First

**MVP Loop (Phase 2.1):**

- Weekly task list generation
- Simple progress checkboxes
- Monthly project brief

**Later (Phase 2.2+):**

- Portfolio tracking
- Application kit generator
- Trend updates
- Community/office hours

---

## 4. Pricing Strategy

### Three Tiers

#### Free Tier

**Purpose:** Conversion funnel

**Includes:**

- One assessment
- Top 3 drivers (with evidence)
- 1-2 best-fit paths
- 7-day starter checklist

**CTA:** "Get my result"

---

#### One-Time "Roadmap Pack" ($19-$39)

**Purpose:** Immediate revenue without subscription commitment

**Includes:**

- Full factors with evidence + mitigations
- Full 3-5 paths + rationale
- Full 30/60/90 roadmap
- Export (PDF/Notion/Markdown)

**Why this matters:** Converts users who don't want subscriptions but will pay for comprehensive one-time value.

---

#### Monthly Subscription

**Student ($9.99/mo):**

- Weekly plan refresh ("This week's tasks")
- New project brief each month
- Skill sequence + checkpoints
- Major/direction guidance

**Professional ($29.99/mo):**

- Weekly plan refresh + tracking
- 2 project briefs/month (portfolio-grade)
- Application kit helpers
- Resume/interview prep

**Why monthly works:** Progress tracking + weekly updates + improving personalization = ongoing value.

---

## 5. Role Task Library (The Moat)

### Purpose

**Problem:** GPT hallucinates role tasks, leading to inconsistent outputs

**Solution:** Curated database of roles → tasks → exposure → mitigations

### Structure

```typescript
interface RoleTaskEntry {
  role: string;
  industry: string;
  typicalTasks: string[];
  exposureFactors: {
    repetitiveness: number; // 1-10
    judgment: number;
    humanInteraction: number;
    accountability: number;
    physicalPresence: number;
  };
  commonMitigations: string[];
  adjacentRoles: string[];
}
```

### Example Entry

```json
{
  "role": "Junior Accountant",
  "industry": "Finance",
  "typicalTasks": [
    "Data entry for invoices and receipts",
    "Reconciling bank statements",
    "Generating monthly financial reports",
    "Processing payroll",
    "Filing tax documents"
  ],
  "exposureFactors": {
    "repetitiveness": 8,
    "judgment": 3,
    "humanInteraction": 2,
    "accountability": 6,
    "physicalPresence": 1
  },
  "commonMitigations": [
    "Learn financial analysis (move from data entry to insights)",
    "Develop client advisory skills",
    "Specialize in tax strategy or forensic accounting"
  ],
  "adjacentRoles": [
    "Financial Analyst",
    "Tax Specialist",
    "FP&A Analyst",
    "Internal Auditor"
  ]
}
```

### Implementation Plan

**Phase 2.1:** Build library for 50 most common roles
**Phase 2.2:** Expand to 200 roles
**Phase 2.3:** User-submitted role data (with moderation)

### Why This is a Moat

- Hard to replicate quickly
- Compounds over time
- Reduces API costs (less hallucination = shorter prompts)
- Improves output consistency
- Becomes more valuable as it grows

---

## 6. Homepage Updates

### Two-CTA Strategy

**Primary CTA:**

```
Take Free Assessment →
```

**Secondary CTAs (below hero):**

```
Student: Choose a direction →
Professional: Plan a pivot →
```

Both link to `/assessment` with pre-selected audience.

### Updated Hero Copy

**Title:** "Build Your Career Shield"

**Subtitle:** "Know your AI risk in 2 minutes — and get a practical 30/60/90-day plan to improve your resilience."

**Badge:** "Includes a 30/60/90-day roadmap"

**Student Hook:** "Student? Use this to choose a direction →"

---

## 7. Feature Roadmap

### Phase 2.1 (Next 2-4 weeks)

- [ ] Add audience/goal/experienceLevel fields
- [ ] Build Role Task Library (50 roles)
- [ ] Implement one-time Roadmap Pack pricing
- [ ] Set up Supabase for user auth
- [ ] Create weekly task list generator

### Phase 2.2 (4-8 weeks)

- [ ] Add progress tracking UI
- [ ] Build project brief generator
- [ ] Implement Stripe subscriptions
- [ ] Create resume bullet generator
- [ ] Add .edu email verification for Student tier

### Phase 2.3 (8-12 weeks)

- [ ] Expand Role Task Library to 200 roles
- [ ] Add trend tracking system
- [ ] Build interview prep module
- [ ] Create shareable result cards (distribution loop)
- [ ] Add community/office hours (optional)

---

## 8. Success Metrics

### Phase 2.1 Goals

- 100 one-time Roadmap Pack purchases
- 50 monthly subscribers (combined Student + Pro)
- 80% of subscribers complete Week 1 tasks
- Role Task Library covers top 50 roles

### Phase 2.2 Goals

- 500 one-time purchases
- 200 monthly subscribers
- 60% subscriber retention at Month 2
- Role Task Library covers 200 roles

---

## 9. Competitive Advantages

### What Makes This Different

1. **Evidence-Based (Not Horoscope)**
   - Show receipts: cite user inputs + typical tasks
   - Transparent drivers
   - Honesty line: "Not a prediction. A plan."

2. **Executable Plans (Not Vague Advice)**
   - Concrete tasks with "done looks like"
   - Portfolio project briefs
   - Weekly checkpoints

3. **Student-Specific Pathing**
   - Most tools are for workers
   - Students need: major selection, semester planning, project ideas
   - Niche wedge opportunity

4. **Role Task Library**
   - Curated, not hallucinated
   - Compounds over time
   - Hard to copy quickly

5. **Calm Advisor Voice**
   - Professional, not panic-inducing
   - Recommendable to students
   - Builds trust through honesty

---

## 10. Open Questions

### To Validate in Phase 2.1

- [ ] What's the optimal price for Roadmap Pack? ($19 vs $29 vs $39)
- [ ] Do students prefer monthly or one-time?
- [ ] What's the minimum viable progress tracking UI?
- [ ] How often should we refresh role adjacencies?
- [ ] Should we build community features or focus on 1:1 value?

### To Research

- [ ] Competitor pricing analysis
- [ ] Student willingness to pay (survey .edu emails)
- [ ] Most valuable subscription features (user interviews)
- [ ] Churn drivers (exit surveys)

---

## 11. Technical Architecture

### New Components

```
/app
  /dashboard          # User dashboard (progress tracking)
  /roadmap            # Interactive 30/60/90 plan
  /projects           # Project brief generator
  /api
    /progress         # Track completed tasks
    /refresh-plan     # Weekly plan regeneration
    /generate-brief   # Project brief creation
```

### Database Schema (Supabase)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  audience TEXT, -- 'student' | 'professional'
  tier TEXT, -- 'free' | 'roadmap_pack' | 'student_monthly' | 'pro_monthly'
  created_at TIMESTAMP
);

-- Assessments
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  input JSONB,
  result JSONB,
  created_at TIMESTAMP
);

-- Progress
CREATE TABLE progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  week_number INT,
  tasks JSONB,
  completed_tasks TEXT[],
  created_at TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  brief JSONB,
  status TEXT, -- 'planned' | 'in_progress' | 'completed'
  created_at TIMESTAMP
);
```

---

## 12. Migration Path (Phase 1 → Phase 2)

### Backward Compatibility

- Existing free assessments continue to work
- No breaking changes to assessment flow
- New fields are optional (with sensible defaults)

### Gradual Rollout

1. **Week 1:** Launch one-time Roadmap Pack
2. **Week 2:** Add audience selection (default to 'professional')
3. **Week 3:** Launch Student monthly tier
4. **Week 4:** Launch Professional monthly tier
5. **Week 5:** Add progress tracking for subscribers

---

**Status:** Ready to implement after Phase 1 testing validates output quality.

**Next Step:** Run test suite, validate Definition of Done, then begin Phase 2.1 implementation.
