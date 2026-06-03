import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' အသုံးပြုထားသော လမ်းကြောင်းများကို ပရောဂျက် Root နှင့် ချိတ်ဆက်ပေးခြင်း
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist', // Netlify က ဖတ်မည့် ပစ်မှတ် Folder နာမည်
  },
});
