import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Al no poner base, Vite gestionará las rutas de forma automática para Vercel
})
