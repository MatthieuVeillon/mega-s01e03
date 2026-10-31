**Reports: 5** of the 412 merged into desk ticket 4471 · 5 tenants · 2026-04-02 → 2026-10-04 · email 3, app 2

## Problem

The date moves by one day. Nothing is swapped.

- R-41202, kettle.books: "Invite says Tuesday 12 May. Calendar says Monday 11 May."
- R-41209, alder.physio: "Every booking in June is one day off. Only June."
- R-41236, nine.lanterns: "The invite arrived before I made the booking."
- R-41344, pale.harbour: "Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice."
- R-41620, lantern.row: "Tuesday 6 October showed as Monday."

## Why it is not the parser bug (#1)

Swapping day and month cannot move a date by one day. The desk noted these five as a one-day move (`desk-notes.json`), then filed them under `parser` by tenant. The parser fix will not close them.

Likely cause, not confirmed in the code: a date converted across time zones at midnight (Lisbon vs Toronto).

Counted by `src/lib/kb/ProblemTable.svelte` with the desk's own functions (`causes.ts`). Page: `src/routes/kb/incidents/4471/split/+page.svx`.
