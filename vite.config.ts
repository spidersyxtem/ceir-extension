import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Tailwind v4 Plugin ကို လှမ်းခေါ်ခြင်း
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind စနစ်ကို ပါဝင်စေခြင်း
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    cssMinify: 'esbuild', // Lightningcss အစား ပိုမိုတည်ငြိမ်သော esbuild ကို သုံးခိုင်းခြင်း
  },
});
