import type { MotionProps } from 'framer-motion'

export type AnimationVariantKeys =
  | 'opacity-gradient'
  | 'down-to-up'
  | 'up-to-down'
  | 'left-to-right'

const animationVariants: Record<AnimationVariantKeys, MotionProps> = {
  'opacity-gradient': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  'down-to-up': {
    initial: { y: '100%' },
    animate: { y: '0%' },
    exit: { y: 'calc(100% + 1.25rem)' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  'up-to-down': {
    initial: { y: '-100%' },
    animate: { y: '0%' },
    exit: { y: 'calc(-100% - 1.25rem)' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  'left-to-right': {
    initial: { x: '-100%' },
    animate: { x: '0%' },
    exit: { x: 'calc(-100% - 1.25rem)' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
} as const

export const getAnimationVariant = (key: AnimationVariantKeys) => {
  return animationVariants[key]
}
