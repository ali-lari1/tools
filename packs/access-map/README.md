# Access map (paste a job ad below this prompt)

Before you hand a role to an AI agent, map what the person logs in to.

For the job ad below:
1. List every tool, system or channel the role works in, named or clearly implied (e.g. partner email, internal dashboards).
2. For each: what the person does there, in under 10 words.
3. For each: could an AI agent reach it today without a person logging in for it? Answer "yes" (official API or connector exists and is commonly used), "partial" (read-only, or only some actions), or "no" (needs a human login, a phone, a meeting, or judgement in a room).
4. For each "partial" or "no": what has to happen before an agent could do it, in under 12 words.
5. The one task in the ad an agent should never do alone, and why, in one sentence.

Reply with ONLY JSON:
{"role": "", "tools": [{"name": "", "does": "", "agent_access": "yes|partial|no", "blocker": ""}], "never_alone": "", "summary": "<one sentence>"}
