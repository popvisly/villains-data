-- Migration: Add tier column to purchases table
-- Description: Tracks whether a purchase is for the 'execution' pack or 'executive' license.

ALTER TABLE purchases
ADD COLUMN IF NOT EXISTS tier text;

-- Backfill existing rows based on historical pricing
-- We use amount_total (cents) + currency for safety.
-- Execution Pack: ~$39 (3900 cents)
-- Executive License: ~$99 (9900 cents)
UPDATE purchases 
SET tier = CASE 
    WHEN currency = 'usd' AND amount_total >= 9000 THEN 'executive'
    WHEN currency = 'usd' AND amount_total >= 3000 THEN 'execution'
    ELSE 'execution' -- Fallback to execution for historical paid rows
END
WHERE tier IS NULL;

-- Enforce NOT NULL and CHECK after backfill
ALTER TABLE purchases ALTER COLUMN tier SET NOT NULL;

ALTER TABLE purchases
DROP CONSTRAINT IF EXISTS check_purchases_tier;

ALTER TABLE purchases
ADD CONSTRAINT check_purchases_tier 
CHECK (tier IN ('free', 'execution', 'executive'));

-- Index for entitlement lookups
CREATE INDEX IF NOT EXISTS idx_purchases_tier ON purchases(tier);
