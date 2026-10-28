import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5174,
    host: true,
    open: false
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('firebase')) {
            return 'vendor-firebase';
          }
          if (id.includes('leaflet')) {
            return 'vendor-leaflet';
          }
          if (id.includes('three')) {
            return 'vendor-three';
          }
        }
      }
    }
  }
});
