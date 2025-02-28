import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Define the Vite configuration
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root.
      allow: ['..']
    },
    hmr: {
      protocol: 'ws', // Use WebSocket (ws for HTTP or wss for HTTPS)
      host: 'localhost', // WebSocket host, typically localhost for local development
      port: 5173, // Ensure that this port matches the Vite development server's port
      clientPort: 5173, // Ensure the client is also connected to the correct port
    }
  }
});
