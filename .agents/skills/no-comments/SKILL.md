---
name: no-comments
description: Audit comments and suppressions in a requested diff or file set, distinguish useful contracts from prose hiding code problems, and propose cleanup. Use only when the user explicitly asks for a comment audit or no-comments review.
---

# No comments

Audit comments and suppressions in the user's scope. Preserve comments that carry information code cannot express. Flag narration, stale prose, commented-out code, and comments that hide a structural problem.

This skill audits first and edits only after the user approves the proposed set.

## Scope

Use the files or diff named by the user. If the user gives no scope, inspect the current change against the repository's base branch, including the working tree. If there is no clear repository or diff, ask for the scope.

## Audit

Read [`references/comment-audit.md`](references/comment-audit.md) before judging comments.

Use at most one read-only reviewer when an independent pass materially improves the audit. Otherwise review directly. Across the complete parent workflow, never exceed three subagents in total.

The main agent checks every finding against nearby code and rejects unsupported deletions, scope escapes, and proposed application-code changes. Inspect relevant lint and type suppressions rather than assuming they are harmless or wrong.

When a comment describes a surprising constraint, investigate the symbol, its callers, available history, and external boundary. Separate facts from inference. If the constraint remains ambiguous, preserve the comment for now and ask the user or report the missing evidence. Ambiguity is not permission to delete.

## Present findings and stop

Report:

- Comments safe to remove, with reasons.
- Comments that should remain, with the information they preserve.
- Structural issues that make a comment necessary.
- Suppressions that may hide correctness or safety problems.
- Proposed code, type, test, or lint changes that could encode a constraint.

Then wait for the user's approval before deleting comments or changing application code.

## Apply an approved set

After approval in a later turn, remove only the accepted comments and implement only the accepted structural fixes. Prefer the smallest root-cause change in scope. Do not broaden the work to every similar instance unless the user approves that expansion.

Report deletions, preserved comments, structural fixes, encoded constraints, and unresolved items.
