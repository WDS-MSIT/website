---
name: show-me-your-work
description: Keep or review a concise evidence-backed decision trail for a long or multi-phase task. Use only when the user explicitly asks for a decision log, audit trail, or show-me-your-work workflow.
---

# Show me your work

Keep one canonical append-only decision log for work that benefits from later review.

## Format

Start from `references/decision-log-template.md`. Use one Markdown table row per meaningful decision with these columns:

- `ts`: ISO 8601 timestamp.
- `phase`: phase or workstream.
- `decision`: what was chosen or done.
- `why`: the reason in plain words.
- `evidence`: a resolvable path, link, commit, test result, trace, or screenshot.
- `result`: the observed outcome, such as `tests pass`, `reverted`, `INCONCLUSIVE`, or `open`.

Log forks, completed units, pivots, reversions, blockers, and verification results. Do not log every command or narrate obvious mechanics.

## Write rows safely

Use the helper that fits the available shell:

- Bash or a compatible shell: `scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>`.
- PowerShell: `scripts/log.ps1 -LogFile <logfile> -Phase <phase> -Decision <decision> -Why <why> -Evidence <evidence> -Result <result>`.

Both helpers create the header, keep cells on one line, and escape Markdown table syntax. If neither helper can run, append equivalent Markdown rows using the current environment's safe file APIs.

## Location

Keep the log at `docs/output/<task>.md`. The repository ignores generated files in this directory by default so broad Git adds do not publish working notes.

Do not force-add the log. If the user asks for a committed audit trail, review it for private paths, internal links, secrets, and sensitive decisions, then move the approved content into a tracked project document.

## Multiple runs

When another conversation or agent adds to an existing log, its first row uses phase `start` and identifies the prior range it did not write. This preserves authorship without editing old rows.

If a previous row is wrong, append a correcting row that points to the original. Never delete or rewrite history.

## Audit before handoff

Audit the current run in the main thread. Compare its rows with accessible conversation state, repository evidence, and produced artifacts:

- Every row maps to a real decision or action.
- Evidence resolves and supports the claim.
- Important pivots and abandoned approaches are present.
- Results distinguish verified, failed, open, and inconclusive work.

Do not assume filesystem access to a conversation transcript. Use one independent read-only reviewer only for a standalone invocation when risk justifies it and no other workflow has consumed the shared three-subagent budget. The main agent remains responsible for every finding.

## Reply

Point the user to the log, summarize the decisions that matter now, and list weak evidence, missing verification, risky choices, or gaps under `Attention`. Omit `Attention` when there are no findings. Do not report model names.
