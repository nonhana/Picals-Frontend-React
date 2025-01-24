import { presetRemToPx } from '@unocss/preset-rem-to-px'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
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

const customRules: Rule[] = [
  ['font-size-s', { 'font-size': '12px' }],
  ['font-size-m', { 'font-size': '14px' }],
  ['font-size-l', { 'font-size': '16px' }],
  ['color-shallowblack', { color: '#3d3d3d' }],
  ['color-deepgrey', { color: '#858585' }],
  ['color-primary', { color: '#0090F0' }],
  ['color-primary', { color: '#0090F0' }],
  ['bg-normal', { background: '#f5f5f5' }],
  ['bg-light', { background: '#f8f8f8' }],
  ['bg-deepgrey', { background: '#858585' }],
  ['bg-normalgrey', { background: '#c0c0c0' }],
  ['b-deepgrey', { 'border-color': '#858585' }],
]

export default defineConfig({
  presets: [
    presetRemToPx(),
    presetUno(),
    presetAttributify(),
    presetIcons(),
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
        'float-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(50%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
        'float-up': 'float-up 0.3s forwards',
      },
    },
  },
})
