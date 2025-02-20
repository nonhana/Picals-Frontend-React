import type { ComponentProps } from 'react'
import type { AnimationVariantKeys } from './preset'
import { motion } from 'framer-motion'
import { getAnimationVariant } from './preset'

interface Props extends ComponentProps<typeof motion.div> {
  type: AnimationVariantKeys
  children?: React.ReactNode
}

function AnimatedDiv({ type, children, ...rest }: Props) {
  const animation = getAnimationVariant(type)

  return (
    <motion.div
      {...rest}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedDiv
