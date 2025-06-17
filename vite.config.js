import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
  },
  server: {
    allowedHosts: [
      'devserver-preview--elportfoliotania.netlify.app',
      // add other allowed hosts if needed
    ],
    // ...other server options
  },
  // ...other config
})
