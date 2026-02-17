---
title: Email Sequences
description: Automated post-purchase nurture emails
last_updated: 2026-02-17
---

# Captori Email Sequences

These emails are triggered via Stripe webhooks and sent via Resend.

## Dynamic Variables

- `{{user_name}}`: Customer first name
- `{{resilience_score}}`: Calculated score (e.g., 74%)
- `{{top_driver}}`: Main leverage factor (e.g., Strategic Judgment)

---

## Email 1: Immediate (Day 0)

**Subject**: Your AI-Life Plan is Ready 🎯

**Body**:
Hi {{user_name}},

Your AI-Life Plan is attached to this email.

**Here's what to do first:**

1. Open your plan (PDF attached)
2. Start with the "This Week" section (page 2)
3. Build your first proof artifact (Week 1-2 in the 30/60/90 plan)

**YOUR RESULTS:**

- Resilience Index: {{resilience_score}}%
- Top leverage driver: {{top_driver}}
- Your 90-day goal: Ship 3 proof artifacts that demonstrate strategic judgment

**QUICK START:**
Most users begin with their decision framework (30-day milestone). It takes 2-3 hours to document your trade-off logic from recent decisions.

Questions? Just reply to this email.

P.S. - Your plan only works if you execute. Block 90 minutes this week to start.

---

## Email 2: Day 7 Check-in

**Subject**: Week 1 Check-in: Did You Start? ⚡

**Body**:
Hi {{user_name}},

Quick check-in on your AI-Life Plan.

**DID YOU START BUILDING?**
✅ If yes -> Reply and tell me what you're working on
❌ If not -> What's blocking you?

REMINDER: The plan only works if you execute.

**Your Week 1 milestone**: Document your decision framework
**Time needed**: 2-3 hours
**Output**: 1-page "How I Make Trade-offs" doc

Don't wait for the perfect moment. Start messy. Refine later.

P.S. - 30% of users ship their first artifact in Week 1. Be in that group.

---

## Email 3: Day 30 Checkpoint

**Subject**: 30-Day Checkpoint: What Have You Shipped? 📦

**Body**:
Hi {{user_name}},

You're 1/3 through your 90-day plan.

**CHECKPOINT QUESTIONS:**

- Did you build your decision framework?
- Did you run a high-stakes triage session?
- Did you document your logic in a memo/brief?

If you've shipped ANY proof artifacts, I want to hear about it.

**NEXT 30 DAYS:**
Focus on "Proof Depth" (Days 31-60):

- Templatize your judgment
- Teach it once
- Build repeatable leverage

Reply with your progress!

---

## Email 4: Day 90 Results

**Subject**: 90-Day Results: What Changed? 🚀

**Body**:
Hi {{user_name}},

Final check-in on your AI-Life Plan.

It's been 90 days since you got your Resilience Index ({{resilience_score}}%).

**WHAT CHANGED?**

If Captori helped you build leverage, would you be willing to share a 2-sentence testimonial?

Format: "[What you built] helped me [specific outcome]"

P.S. - If you found value in Captori, share it with one colleague: captori.com
