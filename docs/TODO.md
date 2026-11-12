# Deferred work

Keep work here only when the project has chosen to postpone it. Remove an item when work starts. Move accepted decisions into `ARCHITECTURE_DECISIONS.md`.

## Accounts and security

- Define how a superadmin creates and delivers a new account after bootstrap.
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
- Normalize faculty photos into Media and detailed-profile PDFs into Documents before importing faculty drafts.

## Document content

- Define the document category taxonomy after reviewing the legacy document inventory.
- Add publication date, academic year, language, and supersession metadata when their editorial rules are agreed.
- Migrate seeded `legacyAttachments` from `msit.in` into reviewed Documents before retiring the old file host.
- Download, validate, deduplicate, and review legacy files when S3/R2 migration work begins.

## Seeded file migration

- Extend the seed/import pipeline to download and validate every referenced legacy file, upload images into Media and document files into Documents, and attach those records to the relevant departments, people, societies, updates, events, pages, facilities, and globals.
- Retain each old `msit.in` file URL as provenance, but stop using legacy URLs as the file served by seeded content after its object has been reviewed and uploaded.
- Make file ingestion idempotent so reseeding reuses the same Media or Document record and object instead of uploading duplicates.
- Decide how failed downloads, unsupported MIME types, duplicate files, and objects that exceed the configured upload limit are reported for editorial review.

## Society content

- Assign society categories during editorial review; the legacy page does not provide categories.
- Confirm that student names and contact details are still current and approved for public display.
- Resolve faculty coordinator names that do not match exactly to Faculty records.
- Migrate `legacyDocuments` and `legacyImages` into reviewed Documents and Media records.
- Add related Events and activities after the Events domain exists.

## Infrastructure

- Select the production hosting platform and managed PostgreSQL provider.
- Confirm the production R2 bucket policy, CORS policy, public URL, and cache policy.
- Apply `S3_CORS_ORIGINS` to the production R2 bucket through its deployment provisioning; application environment variables do not change bucket policy by themselves.
- Add an automated integration check for server-processed Media uploads, direct Documents uploads, and public object retrieval against MinIO and a non-production R2 bucket.
