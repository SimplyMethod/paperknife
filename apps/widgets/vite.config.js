import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  // plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      cssModules: {
        pattern: 'paperknife-[hash]-[local]',
      },
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
});
