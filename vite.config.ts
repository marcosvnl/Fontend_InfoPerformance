import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Fontend_InfoPerformance/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true // Abre o navegador automaticamente
  },
  build: {
    outDir: 'dist',
    sourcemap: true // Gera sourcemaps para debugging
  }
})