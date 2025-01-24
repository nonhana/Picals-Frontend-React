import type { WorkNormalItem } from '@/apis/types'
import { FC, useState } from 'react'
import { Link } from 'react-router'

import LazyImg from '../lazy-img'
import AnimatedDiv from '@/components/motion/animated-div'

type WaterfallItemProps = {
  item: WorkNormalItem
  height: number
  [key: string]: any
}

const WaterfallItem: FC<WaterfallItemProps> = ({ item, height, ...props }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      {...props}
      style={{ height }}
      className='relative w-75 rd-6 overflow-hidden cursor-pointer'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      {hovering && (
        <AnimatedDiv type='opacity-gradient'>
          <Link
            to={`/work-detail/${item.id}`}
            className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-10px items-center bg-black bg-opacity-32 color-white font-size-m z-1'>
            <span>作品名称：{item.name}</span>
            <span>转载人：{item.authorName}</span>
            <span>转载时间：{item.createdAt}</span>
          </Link>
        </AnimatedDiv>
      )}
      <LazyImg src={item.cover} alt={item.name} />
    </div>
  )
}

export default WaterfallItem
