import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const runbook = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

// Builds the kb to static HTML, one self-contained file per page.
export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook } })],
      adapter: adapter(),
      output: { bundleStrategy: 'inline' },
      inlineStyleThreshold: Infinity,
      prerender: { entries: ['/kb/'], handleHttpError: 'warn' },
    }),
  ],
});
