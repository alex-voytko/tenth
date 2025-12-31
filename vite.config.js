import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'circle-chart': resolve(__dirname, 'node_modules/circle-chart')
    }
  }
})

