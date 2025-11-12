
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // FIX: A user page repo (username.github.io) is served from the root.
  // The base must be '/' for all assets to load correctly.
  base: '/',
});
