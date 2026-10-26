---
name: how
description: Explain how code works, trace runtime flow, or determine placement, ownership, and layering. Use for code walkthroughs and architectural grounding; use history evidence separately for why a design exists.
---

# How

Explore the codebase and explain a subsystem at the level needed for a senior engineer to work in it. Build a useful mental model rather than an annotated source listing.

Keep the work read-only unless the user separately asks for changes.

## 1. Assess complexity

If the scope is ambiguous, state the interpretation and begin with the narrowest useful reading. The user can redirect.

- **Simple:** one module, a small utility, or a narrow function question. Explore and explain directly in the main thread. Do not spawn a subagent.
- **Complex:** a subsystem spanning several files or services, a cross-cutting flow, or a broad architectural overview. Continue to step 2.

When in doubt, take the simple path.

## 2. Explore a complex system

Divide the question into distinct slices. Use targeted repository inspection first. Delegate only when parallel exploration materially reduces context pressure or improves coverage.

Across the complete parent workflow, no more than three subagents may be used. If this skill is nested, honor the remaining budget supplied by the caller. If no budget is stated, assume nested use gets no subagents. A standalone invocation may use up to three explorers.

Give each explorer [`references/explorer-prompt.md`](references/explorer-prompt.md), one non-overlapping angle, and a read-only scope. The main agent should keep at least one cross-cutting concern for its own inspection.

## 3. Synthesize in the main thread

The main agent reads the findings, resolves contradictions against the code, fills gaps with targeted checks, and writes the explanation. Do not spawn a separate explainer.

Use [`references/output-guide.md`](references/output-guide.md) in the main thread. Lightly adapt its sections to the question.

## Output

Use only the sections that help: Overview, Key concepts, How it works, Where things live, and Gotchas. Cite specific files and symbols. Acknowledge gaps rather than hiding them.
