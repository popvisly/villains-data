# GA4 Quick Checklist (Captori)

Measurement ID: **G-R8VT128S2F**

## 1) Confirm GA is installed
- Open: `view-source:https://captori.com/`
- Search for: `gtag/js?id=G-R8VT128S2F`

## 2) Realtime sanity check (no purchase)
GA4 → Reports → Realtime

In an incognito window:
1. Visit `https://captori.com/`
2. Click **Calculate My Resilience Index**
3. Go to `/playbook` and click **Unlock Full Suite ($39)**

Expected in Realtime “Event count by event name”:
- `page_view`
- `cta_clicked_start_assessment`
- `assessment_start`
- `artifact_action`
- `checkout_started`

## 3) Paid-flow check (requires a successful purchase)
1. Complete a purchase
2. You will pass through `/assessment/success` and be redirected to `/assessment`

Expected events:
- `post_purchase_land`
- `purchase_completed`
- `artifact_viewed` (artifact: `assessment`, tier set when available)

Execution Pack value moment:
- Click **Download PDF Pack** → `execution_pack_pdf_downloaded`

## 4) DebugView (if Realtime is empty)
GA4 → Admin → DebugView

Open:
- `https://captori.com/?debug_mode=true`

If DebugView is empty, check blockers:
- Disable adblock/shields for captori.com
- Try Chrome incognito

## Notes
- GA4 can lag 10–60s in Realtime.
- Some browsers/extensions block gtag requests by default.
