import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\/(.*)$/, replacement: `${fileURLToPath(new URL('./src/', import.meta.url))}$1` },
      {
        find: /^@components\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./src/components/', import.meta.url))}$1`,
      },
      {
        find: /^@pages\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./src/pages/', import.meta.url))}$1`,
      },
      {
        find: /^@styles\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./src/styles/', import.meta.url))}$1`,
      },
      {
        find: /^@data\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./src/data/', import.meta.url))}$1`,
      },
      {
        find: /^@types\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./src/types/', import.meta.url))}$1`,
      },
      {
        find: /^@utils\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./src/utils/', import.meta.url))}$1`,
      },
    ],
  },
});
