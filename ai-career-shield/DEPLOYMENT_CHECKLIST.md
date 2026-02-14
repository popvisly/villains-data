# Production Deployment Checklist (Phase 21)

## 1. Codebase Sync

- [ ] Push all local changes to `main` branch.
  - `git add .`
  - `git commit -m "feat: phase 20.1 polish and phase 25 test suite"`
  - `git push origin main`

## 2. Vercel Configuration

- [ ] **Environment Variables**: ensure the following are set in Vercel Project Settings:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `OPENAI_API_KEY`
  - `STRIPE_SECRET_KEY` (Live Mode sk_live_...)
  - `STRIPE_WEBHOOK_SECRET` (whsec_...)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live_...)
  - `NEXT_PUBLIC_APP_URL` (e.g., <https://ai-career-shield.vercel.app>)

## 3. Database (Supabase)

- [ ] **Migrations**: Verify all migrations are applied in production (SQL Editor -> Run).
  - `001_initial_schema.sql` (Tables)
  - `002_purchases_table.sql` (Purchases)
  - `003_analytics_events.sql` (Analytics)
  - `004_interview_usage.sql` (Gating Logic) - **CRITICAL: Ensure this is applied or Interview Simulator will break.**
- [ ] **RLS Policies**: Confirm operational.

## 4. Stripe (Live Mode)

- [ ] **Product**: Ensure "Execution Pack" exists in Live Mode ($19).
- [ ] **Price ID**: Update `STRIPE_PRICE_ID` env var if different from Test Mode (usually is).
- [ ] **Webhooks**: specific URL `https://[your-domain]/api/webhooks/stripe`.
  - Events: `checkout.session.completed`

## 5. Smoke Test (Production)

- [ ] **Domain**: Test on REAL HTTPS domain (e.g., `ai-career-shield.vercel.app`).
  - *Note: Auth cookies (`aicp_ep`) are `secure: true` in production, so they will NOT work on `http://` or IP addresses.*
- [ ] **Free Flow**: Run assessment, see results.
- [ ] **Persistence**: Refresh page, ensure results stay.
- [ ] **Purchase**: Buy the pack (real $19).
- [ ] **Unlock**: Verify access is granted immediately.
- [ ] **Interview**: Verify 10-turn limit is active.

## 6. Post-Launch

- [ ] **Monitoring**: Check Vercel Logs for 500s.
- [ ] **Analytics**: Verify events appearing in Supabase `analytics_events`.
