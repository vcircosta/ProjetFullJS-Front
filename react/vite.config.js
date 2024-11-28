import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000', // Rediriger les requêtes vers ton back-end
      '/users': 'http://localhost:5000',
      '/cvs': 'http://localhost:5000',
      '/recommendations': 'http://localhost:5000',
    },
  },
});
