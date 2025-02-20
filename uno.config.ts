import { presetRemToPx } from '@unocss/preset-rem-to-px'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  presets: [
    /* Core Presets */
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        noto: [
          'Noto Sans:300,400',
          'Noto Sans SC:300,400',
          'Noto Sans TC:300,400',
          'Noto Sans JP:300,400',
        ],
      },
    }),

    /* Community Presets */
    presetRemToPx(),
    presetScrollbar(),
  ],
  transformers: [transformerAttributifyJsx(), transformerDirectives(), transformerVariantGroup()],
  shortcuts: [['title', 'text-lg font-bold text-[#858585]']],
  theme: {
    colors: {
      azure: {
        DEFAULT: '#0090F0',
        50: '#D1EDFF',
        100: '#BDE5FF',
        200: '#94D4FF',
        300: '#6BC4FF',
        400: '#43B4FF',
        500: '#1AA3FF',
        600: '#0090F0',
        700: '#006EB8',
        800: '#004D80',
        900: '#002B48',
        950: '#001A2C',
      },
      neutral: {
        DEFAULT: '#858585',
        50: '#F5F5F5',
        100: '#EBEBEB',
        200: '#D6D6D6',
        300: '#C2C2C2',
        400: '#ADADAD',
        500: '#999999',
        600: '#858585',
        700: '#666666',
        800: '#474747',
        900: '#292929',
        950: '#1A1A1A',
      },
    },
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
