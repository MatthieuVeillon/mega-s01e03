**Reports: 374** of the 412 merged into desk ticket 4471 · 11 tenants · 2026-04-01 → 2026-10-04 · app 202, email 147, form 25

## Problem

The shared date parser reads every date month first. All our tenants write the day first, so day and month swap.

Example: Harbour Dental (en-GB) books 7 April; the reminder goes out on 4 July (R-41200).

## Which reports

Every report in desk ticket 4471 from a day-first tenant, except:
- form reports from booking-v3 tenants (see #2), and
- the five one-day moves (see #3).

This is the bug desk ticket 4471 describes, and the fix queued there is for this one only.

## Check

In 370 of these reports both dates are given, and day and month are exactly swapped. The other 4 give no dates ("sent my mother to the dentist on the wrong day", "Our October bookings came through for January", a request for a day-first setting, "telling clients the date in words") and are placed by tenant, like `causes.ts` does.

Counted by `src/lib/kb/problems.ts` from `src/lib/data/reports-4471.json` (427 rows, 412 unique ids). Page: `src/routes/kb/incidents/4471/split/+page.svx`.
