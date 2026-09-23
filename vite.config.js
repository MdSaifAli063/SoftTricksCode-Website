import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Disable sourcemaps in production: reduces deploy size and avoids leaking source
    sourcemap: false,
    // Enable per-route CSS splitting so non-critical CSS loads async
    cssCodeSplit: true,
    // es2019 enables better tree-shaking without polyfill overhead
    target: 'es2019',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Three.js is lazy-loaded (footer only) — isolated chunk kept separate
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            if (id.includes('vanilla-tilt') || id.includes('react-hot-toast')) {
              return 'vendor-ui';
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('react-helmet-async')
            ) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
});
