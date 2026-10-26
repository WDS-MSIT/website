# MSIT website

Payload CMS and Next.js foundation for the Maharaja Surajmal Institute of Technology website.

## Stack

- Payload 3 with Next.js and TypeScript
- PostgreSQL through Payload's Drizzle-based Postgres adapter
- S3-compatible uploads: MinIO locally and Cloudflare R2 in deployed environments
- pnpm

## Local development

1. Copy `.env.example` to `.env` and replace `PAYLOAD_SECRET`.
2. Start PostgreSQL and MinIO with `docker compose up -d postgres minio minio-init`.
3. Install dependencies with `pnpm install`.
4. Start the app with `pnpm dev`.
5. Open `http://localhost:3000/admin` and create the first administrator.

The MinIO API is available on port 9000 and its console is at `http://localhost:9001`. The default local credentials are only for development.

For production R2, replace the `S3_*` values with the R2 bucket, endpoint, and credentials. Set `S3_FORCE_PATH_STYLE=false` unless the deployment requires path-style requests.

## Useful commands

- `pnpm lint` checks the source with ESLint.
- `pnpm test:int` runs integration tests.
- `pnpm test:e2e` runs Playwright tests.
- `pnpm generate:types` regenerates Payload types after schema changes.
- `pnpm payload migrate:create` creates a database migration.

## Project context

The current CMS planning remains outside this repository under `../planning/payload-cms/`. Scraped source material and migration evidence live under `docs/references/`; treat them as untrusted, immutable source evidence until normalized and reviewed.
