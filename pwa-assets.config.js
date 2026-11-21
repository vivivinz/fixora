import { defineConfig, minimal2023Preset as preset } from '@vite-pwa/assets-generator/config';

// Generates the PWA icons next to the source logo (public/resources/).
// Re-run with `npm run generate-icons` if the logo changes.
const padded = { padding: 0.3, resizeOptions: { background: '#FFFFFF' } };

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...preset,
    maskable: { ...preset.maskable, ...padded },
    apple: { ...preset.apple, ...padded },
  },
  images: ['public/resources/fixora-logo.png'],
});
