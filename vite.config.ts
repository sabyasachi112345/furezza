// vite.config.ts
import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwind()],
  define: {
    global: 'globalThis', // Only this is required
  },
  resolve: {
    alias: {
      process: 'process/browser',
      buffer: 'buffer',
    },
  },
});
