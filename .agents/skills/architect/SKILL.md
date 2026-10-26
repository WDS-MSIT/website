---
name: architect
description: Design types, interfaces, and module boundaries before implementation. Use only when the user explicitly asks to architect or design a non-trivial change.
---

# Architect

Sketch types, function signatures, class shapes, and module boundaries with `not implemented` bodies and pseudocode. Compare distinct shapes, agree on one with the user, then implement only after the user approves it.

## Start

Track these phases in a visible checklist when the client supports one:

1. Ground
2. Sketch
3. Agree
4. Implement
5. Reconsider

This skill has a total budget of three subagents, including subagents used by any nested workflow. Do not delegate Phase A. Phase B may use at most two subagents. The main agent owns synthesis and communication.

## Phase A: Ground the problem

Build a real mental model of every system the new code touches. Use the investigation method from the `how` skill directly in the main thread: trace the runtime flow, ownership, boundaries, important types, and non-obvious constraints. Naming a file is not grounding.

When the design changes ownership or layering, inspect available code history, rationale, tests, and documentation for the reason behind the existing shape. Separate explicit evidence from inference. If relevant history is inaccessible, name that gap instead of guessing.

Skip this phase only for genuinely greenfield work with no surrounding system to integrate.

## Phase B: Sketch distinct candidates

Produce at least two structurally distinct candidates before synthesis, even when the first looks sufficient. Whole-shape alternatives matter more than point variations inside one shape.

For a constrained design, the main agent can produce both candidates. For an open or consequential design, it may delegate one candidate to each of two subagents. Give both the same task, grounding artifacts, and [`references/runner-prompt.md`](references/runner-prompt.md). Do not assign models. Give writable candidates separate files or directories when they must create artifacts.

Screen every candidate against [`references/design-red-flags.md`](references/design-red-flags.md). Compare viable candidates on:

- The caller's experience and realistic usage.
- Interface depth: capability hidden relative to public complexity.
- Ownership of state and decisions.
- Whether types encode important invariants.
- Trace length and reader effort.
- Compatibility with the grounded constraints.

Choose a coherent base and adapt only the strongest compatible ideas from the other candidate. Do not average incompatible designs.

Write the synthesized design using [`references/rationale-template.md`](references/rationale-template.md).

## Phase C: Agree

Present the synthesized design, alternatives, tradeoffs, risks, and open questions. Then stop.

Always wait for the user's explicit approval before implementation. Do not waive this checkpoint, even if the initial request asked for design and implementation together. The purpose of this skill is to keep the user involved in the architectural decision.

If the user pushes back, treat that response as new grounding evidence. Revise or replace the candidates and return to this checkpoint.

## Phase D: Implement against the approved sketch

After approval in a later turn, replace `not implemented` bodies with code and pseudocode with logic. The approved sketch is the contract.

Surface meaningful deviations before making them. In particular, stop when implementation reveals a new public parameter, ownership change, compatibility cost, or requirement that the approved design did not cover. Routine local details do not need another checkpoint.

## Phase E: Reconsider a wrong architecture

Reconsider the design when implementation shows a repeated structural mismatch, not merely an isolated edge case. Signals include:

- The same workaround appearing across unrelated code.
- Several edge cases needing the same special branch.
- Types needing repeated casts, escape hatches, or falsely optional fields.
- Callers needing to understand internal rules.
- Two or more implementation deviations with the same cause.

When these signals appear:

1. Re-ground in the main thread using the new evidence.
2. Remove assumptions and unnecessary structure before adding replacements.
3. Produce two revised candidates.
4. Return to Phase C and wait for approval again.

## Outputs

Write caller usage first and derive the type sketch from it. A small change may need one file with types and signatures. A larger change may need a module map plus type definitions. The rationale accompanies either form and records the rejected alternative as well as the chosen design.
