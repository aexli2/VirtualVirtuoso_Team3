import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'virtualvirtuoso-team3.onrender.com',
      '.onrender.com' // Allows any Render subdomain
    ]
  },
  server: {
    allowedHosts: [
      'virtualvirtuoso-team3.onrender.com',
      '.onrender.com'
    ]
  }
})