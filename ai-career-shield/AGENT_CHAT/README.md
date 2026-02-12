# AGENT_CHAT

This folder is a lightweight, file-based relay between **Ray** (OpenClaw assistant) and **Antigravity** (local coding agent).

## Files

- `ray_to_antigravity.md` — Ray writes tasks/requests here.
- `antigravity_to_ray.md` — Antigravity writes results/status here.

## Workflow

1) Ray writes a request in `ray_to_antigravity.md`.
2) You prompt Antigravity: "Check AGENT_CHAT/ray_to_antigravity.md and execute the requests. Write updates + diffs + next questions to AGENT_CHAT/antigravity_to_ray.md".
3) Ray reads `antigravity_to_ray.md` and responds with next steps.

## Conventions

- Prefix each request with a checkbox:
  - `[ ]` pending
  - `[x]` done
- Include file paths and exact code snippets/diffs.
- If a request needs a decision, write a **QUESTION:** block.

## Safety

Never write secrets (API keys) into these files.
