# Deferred work

Keep work here only when the project has chosen to postpone it. Remove an item when work starts. Move accepted decisions into `ARCHITECTURE_DECISIONS.md`.

## Accounts and security

- Define how a superadmin creates and delivers a new account after bootstrap.
- Add password-reset email after the project selects an email provider.
- Decide whether the college needs multi-factor authentication or single sign-on.
- Define how often the college reviews active accounts.
- Add support for one user to hold manager roles across different resource types. The first version supports one role per user.
- Decide whether contributors can hold scopes from more than one domain type. The first version limits each contributor to departments, the placement cell, or societies.
- Decide whether the project needs an audit log beyond Payload versions and timestamps.

## Department content

- Represent Head of Department and shift assignments as relationships rather than faculty or department text fields.
- Model laboratories separately so their facilities, equipment, courses, and media can evolve independently of department identity.
- Model academic programmes and keep programme educational objectives, programme outcomes, programme-specific outcomes, and intake on that domain rather than on departments.
- Model time-sensitive accreditation claims with their programme, accrediting body, validity period, and supporting document before importing or publishing them.
- Review the scraped department material and normalize approved claims before publishing the seeded department drafts.

## Faculty content

- Decide how to represent publication, patent, citation, and experience totals with evidence and an as-of date rather than storing permanently stale counters.
- Import only verified contact details and profile links. Reject placeholder links and generated search-result URLs from the structured handoff.
- Normalize faculty photos and detailed-profile PDFs into Media records before importing faculty drafts.

## Infrastructure

- Select the production hosting platform and managed PostgreSQL provider.
- Select the production email provider.
- Confirm the production R2 bucket policy, CORS policy, public URL, and cache policy.
- Run the full PostgreSQL and MinIO integration suite when Docker Desktop is available.
