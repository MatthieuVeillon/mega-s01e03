# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## Desk ticket 4471, split (MEGA S01E03)

Desk ticket 4471 holds 412 reports and says one bug. It holds three problems:

| problem | reports | ticket |
| --- | --- | --- |
| `parser`: the shared parser reads dates month first | 374 | [#1](https://github.com/MatthieuVeillon/mega-s01e03/issues/1) |
| `hint`: booking-v3's form tells people to type the month first | 33 | [#2](https://github.com/MatthieuVeillon/mega-s01e03/issues/2) |
| `day-shift`: the date moves by one day, nothing swapped | 5 | [#3](https://github.com/MatthieuVeillon/mega-s01e03/issues/3) |

- The page: `src/routes/kb/incidents/4471/split/+page.svx` (signed, desk ref `DR-83YG-60R7`).
- The page as the desk sees it: `rendered/4471-split.html` (built), `rendered/4471-split.jpg` (screenshot).
- The counts: `src/lib/kb/problems.ts`, shown by `src/lib/kb/ProblemTable.svelte`. Nothing else in `src/` changed.
- Build: `npm install && npm run build`, then open `build/kb/incidents/4471/split/index.html`.
