<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, readAs, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // Counts the desk's way, with its own functions: a report counts where it is filed (by tenant),
  // and the one-day moves (desk-notes.json) are footnoted where they are filed. Here they also get
  // a row, because they are a problem of their own.
  type Row = { problem: string; count: number; tenants: number; seen: string; note?: string };
  type Ticket = { url: string; state: string };
  let { ticket, tickets = {} }: { ticket: number; tickets?: Record<string, Ticket> } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf));
  const rows = $derived.by((): Row[] => {
    const out: Row[] = groups.map((g) => {
      const moved = readAs(g, notes.oneDayMove);
      return {
        problem: g.cause,
        count: g.reports.length,
        tenants: g.tenants,
        seen: `${g.firstSeen} → ${g.lastSeen}`,
        note: moved ? `includes the ${moved} day-shift reports, filed here by tenant` : undefined,
      };
    });
    const shifted = merged.filter((r) => notes.oneDayMove.includes(r.id));
    if (shifted.length) {
      const days = shifted.map((r) => r.receivedAt.slice(0, 10)).sort();
      out.push({
        problem: 'day-shift',
        count: shifted.length,
        tenants: new Set(shifted.map((r) => r.tenant)).size,
        seen: `${days[0]} → ${days[days.length - 1]}`,
        note: 'also counted where the desk filed them',
      });
    }
    return out;
  });
  const ticketNo = (url: string) => '#' + url.split('/').pop();
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports in #{ticket} · <strong>{rows.length}</strong>
  {rows.length === 1 ? 'problem' : 'problems'}
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th><th>state</th></tr>
  </thead>
  <tbody>
    {#each rows as r (r.problem)}
      {@const t = tickets[r.problem]}
      <tr class:open={!t || t.state === 'open'}>
        <td><code>{r.problem}</code></td>
        <td>{r.count}{#if r.note}<br /><span class="muted">{r.note}</span>{/if}</td>
        <td>{r.tenants}</td>
        <td>{r.seen}</td>
        <td>{#if t}<a href={t.url}>{ticketNo(t.url)}</a>{:else}no ticket{/if}</td>
        <td>{t?.state ?? 'open'}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
  .muted { color: var(--muted); font-size: 0.8em; }
  .open td { background: var(--warn-bg); }
  .open td:last-child { color: var(--warn); font-weight: 600; }
</style>
