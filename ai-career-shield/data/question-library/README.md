# Question Library

This folder stores *real-world* user questions (e.g., from Reddit) as curated scenarios.

Purpose:
- Improve the quality and realism of AI Career Shield outputs.
- Provide grounded examples for "This Week" actions and Execution Pack briefs.
- Avoid building a scraping pipeline; questions are added manually.

## Rules
- Do not include personal data (names, emails, phone numbers).
- Keep questions paraphrased when possible; store source links separately.
- Store only what is needed to capture the scenario.

## File format (JSON)
Each file should follow the shape:

```json
{
  "id": "string",
  "source": {
    "platform": "reddit|other",
    "subreddit": "string (optional)",
    "url": "string (optional)",
    "capturedAt": "YYYY-MM-DD"
  },
  "persona": {
    "label": "string",
    "audience": "student|professional",
    "background": ["string"],
    "constraints": ["string"],
    "goal": "string"
  },
  "question": {
    "summary": "string",
    "raw": "string"
  },
  "expectedOutputs": {
    "tone": "calm_advisor",
    "shouldInclude": ["string"],
    "shouldAvoid": ["string"]
  }
}
```

Keep it short. The goal is scenario coverage, not archiving entire threads.
