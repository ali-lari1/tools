---
name: lead-follow-up
description: Answer every inbound lead within minutes in the founder's own voice, chase the silent ones on a 2 / 5 / 10 day ladder, and put only the unsure replies in front of a person. Use when a new inquiry lands by email, form or DM, or when the daily follow-up run fires. Not for cold outbound (nothing here writes to a stranger).
---

# Lead follow-up

One job: no inbound lead waits, and no lead goes quiet without three more touches. A person reads
only what the skill is unsure about.

## Read first
- `voice/` : three to five replies the founder actually sent, pasted in. The draft copies their length,
  their greeting, their sign-off. Nothing else teaches voice.
- `offer.md` : what is sold, who it is for, the two or three questions that decide fit, and the one
  link a lead gets when they ask for a call.
- `leads.csv` : the ledger. One row per lead: `id, received, channel, name, company, ask, fit, status,
  last_touch, next_touch, owner_note`.

## Step 1: read the inquiry
Pull the new message (Gmail label `lead/new`, the form webhook payload, or the DM pasted in).
Write a one-line `ask` in the lead's words. Score `fit` as `yes`, `no` or `unsure` against the
questions in `offer.md`. Record the row in `leads.csv` with `status: new`.

## Step 2: draft the reply
- `fit: yes` → a reply that answers the ask, asks the one missing qualifying question, and offers the
  call link. Three to six sentences. Their name once. No bullet list.
- `fit: no` → a two-sentence reply that says so kindly and, when `offer.md` names one, points them
  somewhere better.
- `fit: unsure` → the draft is written and NOT sent. It goes to `review/` with the inquiry attached and
  the reason it is unsure in one line.

Every draft is compared with the three closest replies in `voice/`. If the draft is longer than the
longest of them, cut it.

## Step 3: send, or wait for the person
`yes` and `no` drafts send from the founder's account and `status` becomes `replied`, `last_touch`
today, `next_touch` today + 2 days. `unsure` drafts wait; when the person edits or approves one in
`review/`, send it and set the same fields. Nothing sends twice.

## Step 4: the ladder (runs daily)
For every row with `status: replied` and no reply from the lead since `last_touch`:
- day 2: one line, quoting their original ask, asking if the timing is wrong.
- day 5: one useful thing (a short answer to a question they did not ask yet, from `offer.md`), no ask.
- day 10: the close. "I'll stop here. If this comes back up, reply to this thread." `status: parked`.
A reply from the lead at any rung stops the ladder and sets `status: in_conversation`, which hands
the thread to the person.

## Step 5: the Monday digest
One message to the founder: leads received last week, replied within 10 minutes (count), ladders
running, rows parked, the three `in_conversation` threads that have waited longest for the person.

## Checks before anything sends
- The draft names the lead's ask in its first two sentences. A reply that could be sent to anyone fails.
- No price unless `offer.md` prints one. No promise of a date or a deliverable.
- A lead who asked to be left alone, in any words, gets `status: closed` and nothing else, ever.
- Two leads from the same company in a week are one thread, not two ladders.

## What this does not do
It does not write to anyone who did not write first. It does not negotiate. It does not decide `fit`
for a lead whose message is one line with no company and no ask; that is `unsure`, and a person reads it.
