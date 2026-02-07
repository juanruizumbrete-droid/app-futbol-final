import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Cambiamos a base vacía para que Vercel decida la mejor ruta
  base: '', 
})
