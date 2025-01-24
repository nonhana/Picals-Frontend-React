import { motion } from 'framer-motion'
import { type AnimationVariantKeys, getAnimationVariant } from './preset'
import type { ComponentProps } from 'react'

interface Props extends ComponentProps<typeof motion.div> {
  type: AnimationVariantKeys
  children?: React.ReactNode
}

const AnimatedDiv = ({ type, children, ...rest }: Props) => {
  const animation = getAnimationVariant(type)

  return (
    <motion.div
      {...rest}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}>
      {children}
    </motion.div>
  )
}

export default AnimatedDiv
