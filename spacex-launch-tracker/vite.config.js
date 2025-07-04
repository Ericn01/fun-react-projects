import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/fun-react-projects/space-x-launch-tracker/',
  plugins: [react(), tailwindcss()],
})
