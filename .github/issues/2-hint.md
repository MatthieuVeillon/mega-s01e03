**Reports: 33** of the 412 merged into desk ticket 4471 · 3 tenants (alder.physio, copper.studio, pale.harbour) · 2026-04-17 → 2026-09-22 · all through the booking form

## Problem

booking-v3's form prints `MM/DD/YYYY` under its date field. At a day-first tenant (de-DE, es-ES, pt-PT), people type what the hint says, month first, and the form reads the field the tenant's way, day first. Day and month swap.

Example: Alder Physio, form: "We had two people show up on 8 June. They were booked for 6 August." (R-41241)

## Why it is not the parser bug (#1)

The swap looks the same to the reporter, but it happens in the form, not in the shared parser. The parser fix queued on desk ticket 4471 does not touch it. `causes.ts` already calls this cause `hint`; the desk's own table marks it "not this ticket — no ticket of its own".

Fix: make the hint match how the field is read (or read the field the way the hint says).

## Check

All 33 give both dates, and day and month are exactly swapped. Intake's tag splits them 18 `hint` / 15 `parser`, because it guesses from the reporter's browser; the cause depends on the tenant's form.

Counted by `src/lib/kb/ProblemTable.svelte` with the desk's own functions (`causes.ts`). Page: `src/routes/kb/incidents/4471/split/+page.svx`.
