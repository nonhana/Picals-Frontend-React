import type { WorkNormalItem } from '@/apis/types'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import LazyImg from '../lazy-img'

type WaterfallItemProps = {
  item: WorkNormalItem
  [key: string]: any
}

const WaterfallItem: FC<WaterfallItemProps> = ({ item, ...props }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      {...props}
      className='relative w-75 rd-6 overflow-hidden cursor-pointer'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <CSSTransition in={hovering} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <Link
          to={`/work-detail/${item.id}`}
          className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-10px items-center bg-black bg-opacity-32 color-white font-size-m z-1'>
          <span>作品名称：{item.name}</span>
          <span>转载人：{item.authorName}</span>
          <span>创建时间：{item.createdAt}</span>
        </Link>
      </CSSTransition>
      <LazyImg src={item.cover} alt={item.name} />
    </div>
  )
}

export default WaterfallItem
