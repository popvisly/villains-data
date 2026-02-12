# AI Career Shield - Developer Quick Reference

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
http://localhost:3001
```

---

## Testing

```bash
# Run full test suite (requires OpenAI credits)
node scripts/test-personas.js

# Analyze results
node scripts/analyze-results.js
```

See `TESTING.md` for detailed testing guide.

---

## Key Documentation

- **BRAND_VOICE.md** - Voice principles, do/don't examples, evidence rule
- **TESTING.md** - Testing workflow, troubleshooting, iteration guide
- **PHASE_2.md** - Product evolution roadmap (dual-audience, subscription, moat)

---

## Project Structure

```
app/
├── page.tsx              # Landing page
├── assessment/page.tsx   # Assessment flow
├── actions/assessment.ts # GPT prompt (edit here for quality)
└── api/assess/route.ts   # Test endpoint

scripts/
├── test-personas.js      # Test runner
└── analyze-results.js    # Result analyzer

state_bench_personas.json # 20 test personas
BRAND_VOICE.md           # Brand guide
TESTING.md               # Testing guide
PHASE_2.md               # Phase 2 plan
```

---

## Environment Variables

```bash
# Required for assessment
OPENAI_API_KEY=sk-...

# Phase 2 (future)
NEXT_PUBLIC_SUPABASE_URL=...
STRIPE_SECRET_KEY=...
```

---

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Test single assessment
curl -X POST http://localhost:3001/api/assess \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Software Developer","industry":"Technology","skills":["JavaScript"]}'
```

---

## Prompt Iteration

1. Run: `node scripts/test-personas.js`
2. Analyze: `node scripts/analyze-results.js`
3. Edit: `app/actions/assessment.ts`
4. Repeat until 16/20 pass

---

For detailed guides, see:

- Testing: `TESTING.md`
- Brand Voice: `BRAND_VOICE.md`
- Phase 2 Planning: `PHASE_2.md`
