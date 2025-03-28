import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'making-supporters-ser-donors.trycloudflare.com',  // Add this to allow the host
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules dependencies into a separate chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          
          return null;
        },
      },
    },
  },
});
