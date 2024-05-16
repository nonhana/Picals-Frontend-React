import { defineConfig, loadEnv } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
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
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [
      UnoCSS({
        safelist,
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      react(),
    ],
    build: {
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
        },
      },
    },
  }
})
