import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The production build used relative asset paths (./assets/...).
export default defineConfig({
  base: './',
  plugins: [react()],
});
