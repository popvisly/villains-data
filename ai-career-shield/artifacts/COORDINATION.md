# COORDINATION.md — Captori / AI Career Shield

Purpose: machine-readable handover between agents (Ray ↔ Antigravity).

## State of the Union

- **Project:** Captori (Career Operating Plan)
- **Workspace:** /Volumes/850EVO/VILLAINS AT LARGE/ai-career-shield
- **Phase:** 22 — Funnel Instrumentation
- **Status:** COMPLETED. High-fidelity tracking active across Hero -> Start -> Assessment -> Success.
- **Production:** captori.com (Synced)

## What happened (Phase 22)

- **Landing Pages**: `cta_clicked_start_assessment` and `example_viewed` instrumented on Home and /career-resilience.
- **Module Selection**: `module_selected` and Quiz interactions tracked in /start.
- **Assessment Engine**: `assessment_start`, `assessment_complete`, and streaming performance metrics (`streaming_*`) instrumented.
- **Conversion Loop**: `view_pricing` (intent) and `checkout_started` (intent) mapped to `#pricing` nav.
- **Success Verification**: `purchase_completed` verified in Stripe success callback.
- **Type Safety**: New events added to `EventName` in `lib/analytics-client.ts`.

## Active files (Phase 22)

- app/page.tsx
- app/start/page.tsx
- app/assessment/AssessmentClient.tsx
- app/career-resilience/CareerResilienceClient.tsx
- lib/analytics-client.ts

## Next priority: Phase 23 — Post-Purchase Interaction

- **Goal**: Track specific interactions with the unlocked artifacts (Interview Sim, Playbook usage).
- **Metric**: Retention and utility score.

## Blockers / Resolved

- [RESOLVED] Navigation: Fixed `#pricing` redirect logic to point to canonical homepage section.
- [RESOLVED] GA4 connected (Measurement ID via env: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`).

---
**Handover to Ray**: Phase 22 is functionally complete. The funnel is now a "glass house"—we can see every drop-off point. Walkthrough and task logs are updated. Ready for review.
