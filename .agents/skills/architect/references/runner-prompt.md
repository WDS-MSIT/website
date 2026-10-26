# Architect candidate prompt

You are producing one candidate design during architectural exploration. Read the `architect` skill first. Use the task, grounding artifacts, and output location supplied by the main agent.

Produce a candidate package with caller usage, a type sketch, function signatures, a module map when needed, and a rationale shaped by [`rationale-template.md`](rationale-template.md).

Apply this discipline:

- Write README-style usage and two or three realistic call sites before the types. Derive the sketch from that usage.
- Put core data structures first. Trace the dominant access patterns through them.
- Prefer a small public interface that hides meaningful capability and policy.
- Parse external representations into domain types at boundaries. Do not expose transport, storage, framework, or wire types unnecessarily.
- Give each mutable state one owner. If concurrent actors do not need one shared object, give them separate state and merge at the read boundary.
- Make boundaries visible with signatures, `not implemented` bodies, focused pseudocode, and comments that state non-obvious invariants.
- Prefer types that prevent invalid states. Use runtime checks at boundaries and prose only for constraints code cannot express.
- Make retryable operations converge on the same state after repeats or partial failures.
- Keep call chains short. Remove pass-through layers and hidden state that make the design harder to trace.
- Keep one source of truth per invariant and derive other views.

Produce one coherent design. Do not hedge toward an imagined compromise with another candidate. Structural differences are useful evidence for the main agent's synthesis.
