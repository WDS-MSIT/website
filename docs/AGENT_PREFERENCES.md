# Agent preferences

Use this file for stable human preferences about how agents should collaborate. It intentionally contains no personal preferences in the template.

Add only preferences that materially change agent behavior and are expected to apply across tasks. Examples of appropriate categories include communication style, desired checkpoints, delegation limits, verification expectations, acceptable autonomy, and preferred artifact formats.

Do not store secrets, identity details, private history, temporary task instructions, or preferences inferred from a single interaction. Ask the user before recording a preference that they did not state directly.

Use this format:

```markdown
## Preference title

- Instruction: The behavior agents should follow.
- Applies when: The tasks or conditions covered by the preference.
- Reason: Why this preference helps the user, if useful.
- Confirmed: YYYY-MM-DD or unknown.
```

Delete or revise a preference when the user explicitly changes it. Keep this file short enough that an agent can apply every active entry.

## Keep temporary work reviewable inside the repository

- Instruction: Keep project work inside this Git repository. Work awaiting review stays in its intended location as ordinary uncommitted Git changes. Put temporary written notes or reports under `docs/drafts/`; before committing, delete them or assimilate useful material into the appropriate durable document. Never commit `docs/drafts/` or move unreviewed implementation outside the repository.
- Applies when: Any implementation or documentation work is unfinished or awaiting review.
- Reason: Git's working tree is the review boundary. Temporary notes may support the work, but they must not replace or contain the only copy of project changes.
- Confirmed: 2026-10-27

## Build a working vertical slice before adding depth

- Instruction: Take one feature through every layer it needs, including its schema, database behavior, access rules, Admin UI, API, storage, and tests. Get that path working before adding more detail to each layer.
- Applies when: Planning and implementing features in this project.
- Reason: A working path exposes integration problems early. Later passes can deepen authentication, persistence, storage, and other shared systems with evidence from real features.
- Confirmed: 2026-10-26

## Test failures with severe consequences

- Instruction: Prefer a small test suite for failures that would cause data loss, security breaches, broken access boundaries, or unrecoverable behavior. Do not add tests for ordinary behavior that daily development will expose quickly.
- Applies when: Choosing automated tests for this project.
- Reason: The user wants the test suite to protect high-cost failures without becoming a broad maintenance burden.
- Confirmed: 2026-10-26
