import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para que Vercel encuentre los archivos CSS y JS correctamente
export default defineConfig({
  plugins: [react()],
  base: '/',
})
