import { HistoryItem } from '@/apis/types'
import { WorkNormalItemInfo } from '@/utils/types'
import { FC, useEffect, useRef } from 'react'

import WorkItem from '../work-item'

type AnimeListProps = {
  workList: (WorkNormalItemInfo | HistoryItem)[]
  [key: string]: any
}

const AnimeList: FC<AnimeListProps> = ({ workList, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (containerRef.current && itemsRef.current.length) {
      const containerWidth = containerRef.current.offsetWidth
      const itemWidth = itemsRef.current[0].offsetWidth
      const lineCount = Math.floor((containerWidth + 20) / itemWidth)
      itemsRef.current.forEach((item, index) => {
        const line = Math.floor(index / lineCount)
        item.style.opacity = '0'
        item.style.animation = 'float-up 0.3s forwards'
        item.style.animationDelay = `${line * 0.1}s`
      })
    }
  }, [])

  return (
    <div ref={containerRef} className='relative w-full flex flex-wrap gap-5'>
      {workList.map((item, index) => (
        <WorkItem
          {...props}
          ref={(el) => (itemsRef.current[index] = el!)}
          key={item.id}
          itemInfo={item}
        />
      ))}
    </div>
  )
}

export default AnimeList
