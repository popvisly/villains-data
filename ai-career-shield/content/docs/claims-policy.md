# Captori — Claims Policy (No Hallucinations)

This policy exists to keep Captori credible. NotebookLM/Gemini must follow it.

## Core Rule

**Do not invent facts.** If a claim is not explicitly provided in the prompt, codebase, or a cited source, do not state it as true.

## Allowed Claims

You may state claims that are anchored to at least one of:

1) **User inputs** (what the user said about their role/tasks)
2) **Visible product behavior** (what Captori actually generates)
3) **Product-defined frameworks** (e.g., “Resilience Index” factors and definitions)
4) **Cited sources** (link + publication name/date when possible)

## Disallowed Claims (unless a source is provided)

- Job displacement numbers ("X% of jobs")
- Salary uplift promises
- Testimonials from real people/companies
- “Trusted by” logos/communities you do not have permission to claim
- Guarantees ("will", "always", "proven")

## Wording Defaults (when uncertain)

Use careful language:
- Prefer: **may, tends to, often, in many roles, commonly**
- Avoid: **will, guaranteed, everyone, no one**

## Quotes / Testimonials

- No fake quotes.
- If you need social proof, use **product proof** (example output screenshots, artifacts, before/after) or clearly labeled **hypothetical** examples.

## Metrics

- Only use metrics that you can reproduce or cite.
- If you must include a metric-like line without evidence, label it as a hypothesis, e.g.:
  - “Hypothesis: most users will finish the audit in under 3 minutes.”

## Infographics

- All numbers must be either: (a) sourced, or (b) clearly labeled as illustrative.
- Never imply an official benchmark (“Series B PM benchmark”) unless you can describe the dataset.

## Enforcement

If a required input is missing, ask for it.
If a claim is uncertain, rewrite it into an evidence-based statement or remove it.
