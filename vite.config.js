import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/rapidmatedesktop/',
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://16.171.224.246:3009', // Your backend server
  //       changeOrigin: true,
  //       secure: false, // Set to true if your backend supports HTTPS
  //     },
  //   },
  // },
  build: {
    rollupOptions: {
      output: {
        // Avoid chunk file name issues by not generating multiple chunks.
        manualChunks: undefined,
      },
    },
  },
});
