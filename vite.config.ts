import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const colors = [
  'white',
  'black',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
]

const icon = ['search', 'edit', 'check', 'message', 'star-off', 'delete', 'add', 'share']

const safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...icon.map((v) => `i-mdi-${v}`),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      safelist,
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    react(),
  ],
  build: {
    // 编译时独立输出css
    cssCodeSplit: true,
  },
  server: {
    port: 3030,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
