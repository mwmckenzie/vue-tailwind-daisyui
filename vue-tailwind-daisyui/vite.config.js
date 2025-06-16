import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  tailwindcss(),
    vueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

