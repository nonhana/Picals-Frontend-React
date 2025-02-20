import type { WorkNormalItem } from '@/apis/types'
import { FC, useState } from 'react'
import { Link } from 'react-router'

import LazyImg from '../lazy-img'
import AnimatedDiv from '@/components/motion/animated-div'
import { AnimatePresence } from 'framer-motion'

type WaterfallItemProps = {
  item: WorkNormalItem
  height: number
  [key: string]: any
}

const WaterfallItem: FC<WaterfallItemProps> = ({ item, height, ...props }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <AnimatedDiv
      type='down-to-up'
      {...props}
      style={{ height }}
      className='relative w-75 rd-6 overflow-hidden cursor-pointer'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <AnimatePresence>
        {hovering && (
          <AnimatedDiv type='opacity-gradient' className='absolute inset-0 bg-black/32 z-1 '>
            <Link
              className='size-full flex flex-col items-center justify-center gap-10px color-white text-sm'
              to={`/work-detail/${item.id}`}>
              <span>作品名称：{item.name}</span>
              <span>转载人：{item.authorName}</span>
              <span>转载时间：{item.createdAt}</span>
            </Link>
          </AnimatedDiv>
        )}
      </AnimatePresence>
      <LazyImg src={item.cover} alt={item.name} />
    </AnimatedDiv>
  )
}

export default WaterfallItem
