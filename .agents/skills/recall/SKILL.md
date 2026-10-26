---
name: recall
description: Reconstruct recent working context from accessible conversation history and live project state, then return a concise resume brief. Use only when the user explicitly asks to recall, resume, or catch up on prior work beyond the current conversation.
---

# Recall

Rebuild the user's recent working context before work resumes. Keep the pass read-only and return a concise brief of the current state and the best next move.

## 1. Choose the recall mode

- For one specific prior task, branch, or conversation, reconstruct that effort's stopping point and pending work.
- For a topic across several recent conversations, collect the relevant threads and shared project evidence.
- If the user already supplied a complete state capsule with paths, branch, decisions, and pending work, use it instead of mining history.

## 2. Bound the search

Pin the topic, workspace, and time window. Default `recent` to the last seven days. Use only history and records exposed by the active client. Never assume a Cursor, Codex, or other vendor-specific transcript path, and never search another workspace unless the user asks.

State the scope briefly. Ask only when a missing choice would materially change what history is searched.

## 3. Search accessible history

For one or two candidate conversations, search directly. For a larger accessible history, use at most two read-only subagents to inspect non-overlapping slices. If this skill is nested in another workflow, honor the remaining shared budget of three total subagents; use none when no remaining budget is known.

Each history result records:

- Topic and user goal.
- Decisions already made.
- Completed and open work.
- Corrections or failed approaches worth preserving.
- Artifacts such as branches, pull requests, tickets, and files.
- A citation or identifier the current client can resolve.

Keep raw history out of the main context when a concise finding is sufficient.

## 4. Check shared and live state

When the topic names a feature, file, subsystem, or bug, inspect relevant live repository state and available source-control history in the main thread. Check surfaced branches, diffs, pull requests, or tickets when the current environment provides access.

Search connected documents, chat, issue trackers, or observability only when they are available and likely to contain evidence needed for the user's topic. Do not perform an exhaustive source sweep by default. Record unavailable or unsearched sources when the gap affects confidence.

Distinguish explicit evidence from reasonable inference. Do not convert a plausible narrative into a historical fact.

## Output contract

- **Capsule:** at most five bullets describing the work and overall state.
- **Threads:** one line per workstream, using the most accurate status label available, such as `[merged]`, `[open PR]`, `[in flight]`, `[verified, uncommitted]`, `[reverted]`, or `[planned, not started]`.
- **Problems:** at most five recurring problems, failed approaches, or unresolved risks.
- **Next move:** the single most useful concrete next action.

Keep adjacent work out unless it blocks the named topic. Cite accessible evidence and sanitize private context before any public output.
