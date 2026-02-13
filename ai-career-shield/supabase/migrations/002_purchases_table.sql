-- Create purchases table to track Stripe sales
CREATE TABLE IF NOT EXISTS purchases (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    stripe_session_id text NOT NULL UNIQUE,
    amount_total integer NOT NULL, -- in cents
    currency text NOT NULL DEFAULT 'usd',
    status text NOT NULL, -- 'paid', 'open', etc.
    customer_email text,
    assessment_id text, -- optional link to specific assessment if we persist them
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session_id ON purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_purchases_customer_email ON purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);

-- RLS Policies
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Service Role (server actions/webhooks) can insert
CREATE POLICY "Service role can insert purchases"
ON purchases
FOR INSERT
TO service_role
WITH CHECK (true);

-- Service Role can read (for verification)
CREATE POLICY "Service role can read purchases"
ON purchases
FOR SELECT
TO service_role
USING (true);

-- Admins (if we had auth) or key-based access could read
-- For now, explicit deny for anon/public
CREATE POLICY "Public cannot access purchases"
ON purchases
FOR ALL
TO anon
USING (false);

CREATE POLICY "Authenticated users cannot access purchases"
ON purchases
FOR ALL
TO authenticated
USING (false);
