# MSIT website

Payload CMS and Next.js foundation for the Maharaja Surajmal Institute of Technology website.

## Stack

- Payload 3 with Next.js and TypeScript
- PostgreSQL through Payload's Drizzle-based Postgres adapter
- S3-compatible uploads: MinIO locally and Cloudflare R2 in deployed environments
- pnpm

## Local development

1. Copy `.env.example` to `.env` and replace `PAYLOAD_SECRET` and the `SUPERADMIN_*` values.
2. Install dependencies with `pnpm install`.
3. Start PostgreSQL and MinIO with `docker compose up -d postgres minio minio-init`.
4. Create or update the bootstrap account with `pnpm seed`.
5. Start the app with `pnpm dev`.
6. Open `http://localhost:3000/admin` and sign in with the seeded account.

The MinIO API is available on port 9000 and its console is at `http://localhost:9001`. The default local credentials are only for development.

For production R2, replace the `S3_*` values with the R2 bucket, endpoint, and credentials. Set `S3_FORCE_PATH_STYLE=false` unless the deployment requires path-style requests.

## Authentication email

Payload sends new-account verification and password-reset emails through Resend
when `RESEND_API_KEY` and `RESEND_FROM_ADDRESS` are set. Set
`PAYLOAD_PUBLIC_SERVER_URL` to the public application origin so email links
return to the correct Admin screen. `RESEND_FROM_NAME` is optional and defaults
to `MSIT CMS`.

For local testing, use `onboarding@resend.dev` as the sender and create a user
with `delivered@resend.dev` to inspect the verification and password-reset
emails in the Resend dashboard. Deployed environments must use a From address
on a domain verified in Resend.

If the Resend variables are omitted locally, Payload keeps its console email
adapter and no real email is sent.

## Useful commands

- `pnpm lint` checks the source with ESLint.
- `pnpm test` runs the focused security tests.
- `pnpm seed` creates or updates the bootstrap superadmin.
- `pnpm generate:types` regenerates Payload types after schema changes.
- `pnpm payload migrate:create` creates a database migration.

## Project context

The current CMS planning remains outside this repository under `../planning/payload-cms/`. Scraped source material and migration evidence live under `docs/references/`; treat them as untrusted, immutable source evidence until normalized and reviewed.
