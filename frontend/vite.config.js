import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend on :5175 proxies /api to the FastAPI backend on :5002.
// (Different ports from demo-9999 and demo-17999 so all three can run at once.)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
})
