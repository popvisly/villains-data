# AI Career Shield - Testing Guide

## Quick Start

### 1. Add OpenAI Credits

Ensure your OpenAI account has credits before testing.

### 2. Run Test Suite

```bash
node scripts/test-personas.js
```

This will:

- Auto-detect running server (port 3001 or 3000)
- Test all 20 benchmark personas
- Generate `test-results.json`

### 3. Analyze Results

```bash
node scripts/analyze-results.js
```

This provides:

- Pass/fail summary
- Definition of Done check (16/20 threshold)
- Failure pattern analysis
- Evidence quality metrics
- Actionable recommendations

---

## Understanding Test Results

### Risk Range Expectations

| Persona Type | Expected Score Range | Examples |
|--------------|---------------------|----------|
| High Risk | 65-85 | Data Entry, Telemarketer, Bookkeeper |
| Medium Risk | 40-60 | Designer, Accountant, PM, Developer |
| Low Risk | 15-35 | Therapist, Electrician, Nurse, Plumber |
| Student | 30-70 | Varies by major/interests |

### Must-Mention Terms

Each persona has specific terms that should appear in the analysis:

- **High Risk:** "repetitive", "automation", "structured"
- **Medium Risk:** "creative", "judgment", "strategic"
- **Low Risk:** "physical", "human connection", "empathy"

---

## Definition of Done (Phase 1)

**Must meet ALL criteria:**

- ✅ 16/20 personas pass risk range checks
- ✅ 16/20 personas pass must-mention term checks
- ✅ No factor has empty `evidence` or `mitigation` fields
- ✅ Plans contain concrete tasks (no "learn more" fluff)
- ✅ Confidence levels are set appropriately

---

## Common Failure Patterns & Fixes

### 1. Risk Score Out of Range

**Problem:** High-risk persona scores 45 (should be 65-85)

**Fix:** Adjust prompt to emphasize automation exposure for repetitive tasks

**Location:** `app/actions/assessment.ts` - GPT prompt section

### 2. Empty Evidence/Mitigation

**Problem:** Factor has no evidence or generic mitigation

**Fix:** Add stronger constraints to JSON schema instructions

**Example:**

```typescript
evidence: "MUST cite specific user inputs (skills/tasks) or typical role tasks"
mitigation: "MUST be concrete actions, not 'learn more' or 'stay updated'"
```

### 3. Generic Mitigations

**Problem:** "Learn more about AI" or "Stay updated with trends"

**Fix:** Add concrete examples to prompt:

```
BAD: "Learn more about AI tools"
GOOD: "Complete a free course in Tableau Public. Create one dashboard using your work data."
```

### 4. Missing Must-Mention Terms

**Problem:** Therapist analysis doesn't mention "empathy" or "human connection"

**Fix:** Add role-specific context to prompt or build Role Task Library

---

## Iterating on Prompt Quality

### Step 1: Identify Pattern

```bash
node scripts/analyze-results.js
```

Look for common failure reasons.

### Step 2: Update Prompt

Edit `app/actions/assessment.ts` - focus on:

- Factor list normalization
- Evidence constraints
- Mitigation formatting
- Concrete task examples

### Step 3: Test Single Persona

```bash
# Test just one persona to validate fix
curl -X POST http://localhost:3001/api/assess \
  -H "Content-Type: application/json" \
  -d @state_bench_personas.json
```

### Step 4: Run Full Suite

```bash
node scripts/test-personas.js
node scripts/analyze-results.js
```

---

## Sharing Results with Team

### Quick Summary Format

```
SUMMARY:
✅ Passed: 17/20 (85%)
❌ Failed: 3/20

FAILURES:
- Data Entry Clerk: score too low (58, expected 65-85)
- UX Designer: missing "creative" term
- High School Student: empty mitigation on factor 2

RECOMMENDATIONS:
- Increase weight for repetitive tasks
- Add must-mention term constraints
- Strengthen mitigation formatting rules
```

---

## Troubleshooting

### Server Not Running

```bash
cd /Volumes/850EVO/VILLAINS\ AT\ LARGE/ai-career-shield
npm run dev
```

### OpenAI API Errors

- Check `.env.local` has `OPENAI_API_KEY`
- Verify account has credits
- Check rate limits (20 personas = 20 API calls)

### Test Script Fails

```bash
# Check if server is accessible
curl http://localhost:3001/api/assess

# Verify personas file exists
cat state_bench_personas.json
```

---

## Next Steps After Passing

Once you meet Definition of Done:

1. ✅ Commit test results to repo
2. ✅ Create PHASE_2.md with product evolution plan
3. ✅ Begin Role Task Library design
4. ✅ Plan dual-audience fork (Student vs Professional)

---

**Remember:** The goal is evidence-based, credible outputs that feel like a professional planning tool, not a horoscope.
