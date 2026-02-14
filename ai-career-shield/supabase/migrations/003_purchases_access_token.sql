-- Add access token for persistent, cookie-based entitlements (no-login v1)
ALTER TABLE purchases
  ADD COLUMN IF NOT EXISTS access_token text;

-- One purchase = one token (used in httpOnly cookie)
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_access_token
  ON purchases(access_token)
  WHERE access_token IS NOT NULL;
