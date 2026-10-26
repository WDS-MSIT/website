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

## ADR-004: Use hierarchical roles with domain scope

- Status: accepted
- Date: 2026-10-26
- Supersedes: none
- Related files: `src/collections/Users.ts`, `docs/TODO.md`

### Context

The CMS has institute-wide resources, department resources, placement resources, society resources, and contributors who work inside one of those domains. A user's authority and a user's scope are separate facts.

The first version does not need users who combine manager roles across different domains. It does need department managers who manage more than one department.

### Decision

Use this role hierarchy:

1. `superadmin`
2. `site-manager`
3. `department-manager`, `placement-manager`, and `society-manager` at the same level
4. `contributor`

Higher roles inherit the permissions of lower roles when the resource belongs to their authority.

The `superadmin` can manage every resource, including users and access. The `site-manager` can manage all website content but cannot perform superadmin-only account and system operations.

Each domain manager can manage, approve, and publish content inside that manager's domain. A department manager can manage one or more assigned departments. A placement manager manages the placement domain. A society manager can manage one or more assigned societies. Domain managers cannot manage unrelated domains, site-wide controls, or accounts.

A contributor belongs to one scope type: department, placement, or society. A contributor can create and update work inside the assigned scope. A manager must approve the contributor's work before publication.

Students always receive the `contributor` role. Students never receive a manager role.

The first version assigns one role to each user. It does not support a user who is both a department manager and a society manager. Scope can contain more than one resource within the role's domain, such as two assigned departments.

### Alternatives considered

- A flat role list would repeat permissions and would not express inherited authority.
- One role for each department or society would mix authority with scope and would create many roles.
- Multiple manager roles per user would add access combinations that the first version does not need.

### Consequences

The user model needs one role plus fields that match the role's scope. Access functions must check both values.

Contributor changes need a review state or draft workflow. A domain manager approves work in the same domain. A site manager or superadmin can approve work in any content domain.

The implementation must reject mismatched states, such as a `department-manager` with society scope. Cross-domain manager assignments remain deferred.

### Verification

Test the hierarchy at collection and document level. Each test must cover an allowed action, a denied action in an unrelated scope, and inheritance by each higher role. Test that contributor work cannot become public without manager approval.

## ADR-005: Do not expose GraphQL

- Status: accepted
- Date: 2026-10-26
- Supersedes: none
- Related files: `src/payload.config.ts`, `src/app/(payload)/api/`, `package.json`

### Context

The project does not have a GraphQL client or a planned GraphQL use case. Payload's Local API and REST API cover the current server and public-site needs.

### Decision

Disable Payload's GraphQL support and do not expose the GraphQL or GraphQL Playground routes. Do not keep a direct `graphql` dependency.

### Alternatives considered

- Keeping GraphQL enabled would retain an unused endpoint, dependency, and API contract.

### Consequences

Use the Local API inside the application and use REST for external requests. Reconsider GraphQL only if a concrete client requires it.

### Verification

Confirm that `src/payload.config.ts` disables GraphQL, the Next.js application has no GraphQL route, and `package.json` has no direct `graphql` dependency.
