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

## Infrastructure

- Select the production hosting platform and managed PostgreSQL provider.
- Select the production email provider.
- Confirm the production R2 bucket policy, CORS policy, public URL, and cache policy.
- Run the full PostgreSQL and MinIO integration suite when Docker Desktop is available.
