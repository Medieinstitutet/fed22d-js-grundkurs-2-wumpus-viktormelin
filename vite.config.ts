import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '', // TODO - ändra till ditt repo-namn
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
