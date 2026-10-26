---
name: principle-guard-the-context-window
description: "Apply when context is filling up from large outputs, long files, repeated reads, or parallel exploration. Narrow reads, phase the work, and keep summaries rather than raw payloads in the main thread."
---

# Guard the Context Window

**Why:** Context overflow degrades reasoning quality, creates compression artifacts, and halts progress.

**Pattern:**
- **Size phases and cap scope.** Limit files per phase, set turn budgets, account for mechanism costs.
- **Read narrowly.** Search first, then open only the relevant regions and supporting files.
- **Summarize at boundaries.** Keep conclusions, evidence pointers, and open questions instead of copying raw output forward.
- **Delegate only when useful.** Parallel readers can absorb independent large slices, but the full parent workflow may use no more than three subagents. Nested skills share that budget rather than resetting it.
