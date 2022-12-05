import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/fed22d-js-grundkurs-2-wumpus-viktormelin/', // TODO - ändra till ditt repo-namn
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
