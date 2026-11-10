import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0' // May need to change this once deployed
  },
  // optimizeDeps: {
  //   exclude: ['chunk-VSNPY23K'],  // Add the problematic dependency here
  // },
})
