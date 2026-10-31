<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByProblem, type Problem } from '#lib/kb/problems';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // tickets: where each problem is tracked now, as { problem: url }.
  let { ticket, tickets = {} }: { ticket: number; tickets?: Partial<Record<Problem, string>> } = $props();

  const split = $derived(groupByProblem(reports as Report[], ticket, tenantOf, notes.oneDayMove));
  const counted = $derived(split.groups.reduce((n, g) => n + g.reports.length, 0));
  const ticketNo = (url: string) => '#' + url.split('/').pop();
  const channels = (c: Record<string, number>) =>
    Object.entries(c)
      .sort((a, b) => b[1] - a[1])
      .map(([ch, n]) => `${ch} ×${n}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{split.total}</strong> reports in #{ticket} · <strong>{split.groups.length}</strong>
  {split.groups.length === 1 ? 'problem' : 'problems'}
  {#if counted !== split.total}<span class="off">· {split.total - counted} not counted</span>{/if}
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>came in by</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each split.groups as g (g.problem)}
      <tr class:untracked={!tickets[g.problem]}>
        <td><code>{g.problem}</code></td>
        <td>{g.reports.length}</td>
        <td title={g.tenants.join(', ')}>{g.tenants.length}</td>
        <td class="muted">{channels(g.channels)}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>
          {#if tickets[g.problem]}<a href={tickets[g.problem]}>{ticketNo(tickets[g.problem]!)}</a>{:else}no ticket{/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
  .off { color: var(--warn); font-weight: 600; }
  .muted { color: var(--muted); font-size: 0.85em; }
  .untracked td { background: var(--warn-bg); }
  .untracked td:last-child { color: var(--warn); font-weight: 600; }
</style>
