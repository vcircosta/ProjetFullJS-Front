import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
=======
// https://vitejs.dev/config/
>>>>>>> Random
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
=======
      '/auth': 'http://localhost:5000', // Rediriger les requêtes vers ton back-end
      '/users': 'http://localhost:5000',
      '/cvs': 'http://localhost:5000',
      '/recommendations': 'http://localhost:5000',
>>>>>>> Random
    },
  },
});
