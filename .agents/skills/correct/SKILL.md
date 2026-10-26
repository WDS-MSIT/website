---
name: correct
description: Identify mistakes that recur in a repository and propose structural enforcement. Use only when the user explicitly asks to run a correction audit or stop a repeated mistake.
---

# Correct

Find mistakes that agents or contributors repeat in this repository, then propose the cheapest durable way to make each class harder or impossible to repeat.

This workflow separates diagnosis from modification so the user can understand and choose the corrections.

## 1. Find repeated mistake classes

Read only the relevant history: recent fixes and reverts, review comments, agent instructions, tests, and workaround comments connected to the scope the user named. Do not mine unrelated project history.

Group evidence into mistake classes. Treat two independent occurrences as the normal threshold for calling something recurrent. A single severe event can still be reported, but label it as an isolated risk rather than a class.

## 2. Rank enforcement options

For each class, consider these levels in order:

1. Remove the possibility through ownership, module boundaries, or one supported path.
2. Make the invalid state fail through types, schemas, lint, or a targeted static check with a useful error.
3. Test the observable behavior.
4. Add documentation or agent guidance only when the rule requires judgment and cannot be enforced reliably.

Prefer the highest practical level, but do not expand the requested scope merely to reach a higher level. Explain why the higher levels do not fit.

## 3. Present the correction plan and stop

Report each class with:

- The concrete occurrences that establish it.
- The proposed enforcement level.
- The files or boundaries likely to change.
- The proof that would show the correction works.
- The cost, risk, and any behavior or architecture decision involved.

Then wait for the user to select or revise the classes to implement. Do not edit code, add rules, change CI, or create commits during the diagnostic pass.

## 4. Implement approved corrections

After approval in a later turn, implement only the selected classes. Keep each correction independently reviewable and prove a new check against a real prior mistake when practical.

Do not create commits or pull requests unless the user requests them. Do not require exceptions to carry a particular approval format. If an exception is necessary, keep it narrow and explain its reason near the enforcement mechanism.

If the repository keeps a rule table in an agent instruction file, update it only when that table already exists or the user approves creating one. Pair each rule with its actual enforcement and remove stale entries when the underlying mistake is no longer possible.

## Reply

During diagnosis, return the mistake classes and correction plan, followed by the decision needed from the user. After implementation, return what changed and the evidence that each approved correction works.
