import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Al dejar la base vacía, Vite usará rutas relativas que Vercel entiende mejor
  base: './', 
})
