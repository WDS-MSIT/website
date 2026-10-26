# Comment audit rubric

Judge whether a comment carries information that the code, types, tests, or external specification cannot express clearly.

## Preserve

Preserve these when they are accurate and current:

- Legal and license headers.
- Public API documentation that defines a caller-visible contract.
- A non-obvious requirement imposed by an external dependency, platform, vendor, wire protocol, or compatibility promise that this code cannot change.
- An issue, standard, or design-record link that documents a constraint the code cannot encode.
- A lint or formatter suppression whose rule is faulty or purely stylistic in this exact location, with a narrow reason when the reason is not obvious.
- Safety, mathematical, algorithmic, or operational reasoning whose removal would make correct maintenance materially harder and cannot be represented more clearly in structure.

## Remove or replace

Flag these for removal or replacement:

- Narration that repeats the next statement.
- Section banners and phase labels that describe file layout rather than intent.
- Commented-out code preserved without an active reason.
- Stale descriptions that disagree with behavior.
- `IMPORTANT`, `do not remove`, or workaround prose with no verifiable constraint.
- Broad lint or type suppressions that hide correctness or safety checks.
- Long explanations of surprising behavior owned by this code when a name, type, extraction, or module boundary can make the behavior clear.

For an internal surprise, propose the structural change separately. Do not silently convert a comment cleanup into a refactor.

## Evidence standard

Read the surrounding code before judging. Follow the relevant symbol far enough to test the comment's claim. Consult available history or documentation when the comment describes a historical or external constraint.

When evidence is incomplete, preserve the comment temporarily and report the uncertainty. A strict audit means demanding evidence, not deleting on doubt.
