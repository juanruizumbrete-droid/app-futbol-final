import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Esto asegura que Vercel busque los archivos en la carpeta correcta tras construir la web
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
