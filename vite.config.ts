import { defineConfig, } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), visualizer()],
  server: {
    https: true,
    port: 5173,
  },
});