import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const ICONS = '/resources';

export default defineConfig({
  // Deployed at the domain root on Vercel (https://fixora-cyan.vercel.app).
  base: '/',
  plugins: [
    react(),
    VitePWA({
      // New deploys install in the background and take over on the next page load.
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Keep the old /sw.js URL so browsers that have the previous hand-written worker upgrade to this one.
      filename: 'sw.js',
      manifest: {
        id: '/',
        name: 'FIXORA – Fix it Fast, Make it Last!',
        short_name: 'FIXORA',
        description: 'Academic pilot prototype for appliance and electrical repair requests.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F7F9FC',
        theme_color: '#1F4E96',
        categories: ['utilities', 'lifestyle'],
        icons: [
          { src: `${ICONS}/pwa-64x64.png`, sizes: '64x64', type: 'image/png' },
          { src: `${ICONS}/pwa-192x192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${ICONS}/pwa-512x512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: `${ICONS}/maskable-icon-512x512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Pre-cache the whole app so it works offline from the first visit.
        globPatterns: ['**/*.{js,css,html,png,ico,svg,webmanifest}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
});
