import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Esto obliga a usar rutas relativas, lo que suele arreglar el 404 del CSS
  base: './', 
})
