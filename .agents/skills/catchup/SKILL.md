---
name: catchup
description: Catch the user up on changes in the current conversation and list every decision still waiting on them. Use only when the user explicitly asks for a catch-up or invokes catchup.
---

# Catchup

Catch the user up on what changed in this conversation since their last substantive message. Help them understand each change, then list every decision that still belongs to them. Notifications and subagent results are not user messages.

Use plain words, short sentences, and no unnecessary jargon. Say what changed for the user, not which internal mechanism produced it.

## Gather what changed

Keep this turn read-only. Do not change code, start jobs, publish, or send messages.

Collect completed work, still-running work, failures, relevant subagent findings, and current state for artifacts this conversation actually touched. Verify current state when the client exposes it. Do not invent a status when it cannot be checked.

An action item is a decision or step only the user can take, such as a product choice, approval, irreversible action, or access the agent lacks. Work the agent can continue itself is not an action item.

For every action item, gather enough context for the user to decide from the reply alone: what changes, the relevant evidence, the risk, and a recommendation. Write `unknown` when a necessary fact is unavailable.

## Write the reply

Open with one sentence naming what waits on the user, or saying that nothing does. If nothing changed and nothing waits, say so and stop.

Then provide:

1. A short account of what changed, grouped by the user's requests.
2. Work still in progress or work the agent can continue.
3. Action items, each with the decision, recommendation, evidence, and risk.

Keep the history shorter than the decisions. Do not omit an action item to satisfy a word count.

Use a screenshot, diagram, or small chart only when an available visual capability can show an important relationship more clearly than prose. Never invent a screen or a number. Do not repeat the same fact in both prose and a visual.
