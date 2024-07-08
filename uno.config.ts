// uno.config.ts
// 用于配置 Uno 的配置文件，可以在这里配置 Uno 的预设、插件、转换器等

import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  Rule,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

// 自定义规则
const customRules: Rule[] = []

export default defineConfig({
  presets: [
    presetRemToPx(),
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/mdi').then((i) => i.icons),
      },
    }),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [transformerAttributifyJsx(), transformerDirectives(), transformerVariantGroup()],
  rules: customRules,
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      colors: {
        primary: '#0090F0',
        'primary-bg': '#e6f9ff',
        'primary-dark': '#0072c9',
        'normal-bg': '#f5f5f5',
        'light-bg': '#f8f8f8',
        text: '#3d3d3d',
        'text-info': '#6d757a',
        icon: '#858585',
      },
    },
  },
})
