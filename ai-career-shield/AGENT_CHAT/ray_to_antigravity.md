# Ray → Antigravity

## Phase 4 Ship-Readiness Patchlist (minimal, trust-preserving)

- [ ] **Repair logic: ground fallbacks in role library**
  - File: `app/actions/assessment.ts` (`repairResult`)
  - Current fallback plan tasks include generic items (e.g., newsletter, coffee chat).
  - Change: when patching missing `plan30_60_90` windows, derive tasks from the top recommended role(s):
    - Prefer `roleAdjacencies[0].detail.starterPlan30Days` (or `candidateRoles[0].starterPlan30Days`) + `proofProjects`.
    - Ensure each injected task is a verifiable deliverable.
  - Keep tone calm advisor.

- [ ] **Remove remaining “magic word” hard-requirements from assessment prompt**
  - File: `app/actions/assessment.ts` assessment prompt rules
  - Replace:
    - “explicitly mention AI voice/chatbot…”
    - “explicitly mention empathy/human connection…”
  - With *soft guidance*:
    - “When relevant, mention common automation channels (chatbots/voice AI)…”
    - “When relevant, mention relationship work (empathy, trust)…"
  - Goal: avoid gaming while keeping usefulness.

- [ ] **Type safety: RoleAdjacency `detail` field**
  - File(s): `types/index.ts` (or wherever `AssessmentResult.roleAdjacencies` is typed)
  - Ensure `roleAdjacencies[]` type includes optional `detail` that matches the role object type.
  - Alternative: stop mutating `adj.detail` and hydrate in UI from roleId; choose whichever is simpler.

- [ ] **Execution Pack grounding validator + friendly failure**
  - File: `app/actions/assessment.ts` (`generateExecutionPack`)
  - Add a post-parse validator that:
    - Ensures `result.version === 1`
    - Filters `projectBriefs` to only those where `brief.roleId` is in the provided `roleIds`
    - Ensures required fields non-empty (title, deliverables, steps, rubric)
    - Ensures `skillGapMap.roleId` matches primary role
  - If validation fails hard, do **one** retry with a slightly stricter system message (no new roles, no missing fields).
  - If still fails, throw a user-friendly error message.

## Acceptance
- Persona suite remains 20/20.
- Execution Pack generation is robust (no empty sections, no mismatched roleIds).
- No regressions in brand voice.
