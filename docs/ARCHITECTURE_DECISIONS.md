# Architecture decisions

Use this file as the structured log of architectural decisions accepted for the project. It intentionally contains no decisions in the template.

Add an entry when the project commits to a choice that future contributors must understand, such as an ownership boundary, public interface, data model, dependency direction, persistence strategy, compatibility policy, or operational invariant. Do not log routine implementation details or unaccepted proposals.

Keep entries append-oriented. If a later decision changes an earlier one, add a new entry and mark the earlier entry as superseded rather than rewriting history.

Use this structure for each decision:

```markdown
## ADR-NNN: Short decision title

- Status: proposed | accepted | superseded | rejected
- Date: YYYY-MM-DD
- Supersedes: ADR-NNN or none
- Related files: repository-relative paths

### Context

Describe the problem, constraints, and evidence that made a decision necessary.

### Decision

State the chosen direction and the boundaries it establishes.

### Alternatives considered

List materially different options and why they were not chosen.

### Consequences

Record the benefits, costs, risks, and follow-up obligations.

### Verification

State how contributors can confirm that the code still follows this decision.
```

## ADR-001: Use Payload with PostgreSQL as the application foundation

- Status: accepted
- Date: 2026-10-26
- Supersedes: none
- Related files: `package.json`, `src/payload.config.ts`, `docker-compose.yml`

### Context

The replacement site is primarily a structured publishing system with editorial workflows, access control, previews, migration requirements, and a public website. It needs a relational source of truth and explicit schema migrations.

### Decision

Build the CMS and public application with Payload and Next.js. Use `@payloadcms/db-postgres` for PostgreSQL persistence and Payload's Drizzle-based migrations. PostgreSQL is the source of truth for CMS records.

### Alternatives considered

- A custom CMS would duplicate authentication, editorial, versioning, and Admin UI work.
- MongoDB would not match the selected relational persistence strategy.

### Consequences

Schema work must use Payload collections, fields, hooks, access functions, and generated migrations. Production hosting must support a persistent Node.js process and PostgreSQL connections.

### Verification

Confirm that `src/payload.config.ts` uses `postgresAdapter`, and run the schema migration workflow against PostgreSQL.

## ADR-002: Use one S3-compatible upload boundary

- Status: accepted
- Date: 2026-10-26
- Supersedes: none
- Related files: `src/payload.config.ts`, `.env.example`, `docker-compose.yml`

### Context

Uploads need durable object storage in production without making local development depend on cloud credentials.

### Decision

Use `@payloadcms/storage-s3` for upload collections. Local development targets MinIO. Deployed environments target Cloudflare R2 through its S3-compatible API. Provider details enter through `S3_*` environment variables.

### Alternatives considered

- Local filesystem storage does not exercise the production storage boundary.
- A provider-specific R2 runtime adapter would couple the application to a Cloudflare Workers deployment model.

### Consequences

Local development requires MinIO when testing uploads. Production must supply R2 credentials and use the appropriate endpoint and path-style setting. Additional upload collections must be registered with the same adapter.

### Verification

Start the Compose MinIO services, upload a media record, and confirm that its object exists in the `msit-media` bucket. Repeat against a non-production R2 environment before deployment.

## ADR-003: Keep migration evidence separate from content records

- Status: accepted
- Date: 2026-10-26
- Supersedes: none
- Related files: `docs/references/`, `../planning/payload-cms/migration-pipeline.md`

### Context

The scraped site includes saved HTML, inventories, structured JavaScript, images, and institutional claims of varying freshness and confidence.

### Decision

Keep the raw handoff under `docs/references/` as immutable evidence. Convert it through a reviewable intermediate dataset before idempotent Payload imports. Do not treat the handoff as an approved seed database.

### Alternatives considered

- Directly importing the scrape would lose provenance and publish unsupported facts.
- Editing raw captures in place would make migration results difficult to reproduce.

### Consequences

Migration code must retain stable source keys and provenance, produce diagnostics, and import drafts pending factual review.

### Verification

Confirm that migration runs do not modify `docs/references/`, every imported record retains source metadata, and repeated imports do not create duplicates.
