-- Better Auth 1.6 -> 1.7 account identity migration
-- Strategy: provider-id (per Better Auth 1.7 upgrade guide)
--   credential accounts:   issuer = 'local:credential'
--   external providers:    issuer = 'local:oauth:<encodeURIComponent(providerId)>

-- This migration is two-phase:
--   (a) SQL below: structural changes (add nullable column, NOT NULL, index).
--   (b) TypeScript pre-step: backfill issuer for existing rows with the exact
--       encodeURIComponent encoder that Better Auth uses on insert.
-- Run the TS backfill BEFORE applying this SQL.

ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "issuer" text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "account_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "provider_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "issuer" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "account_issuer_accountId_uidx" ON "account" USING btree ("issuer","account_id");
