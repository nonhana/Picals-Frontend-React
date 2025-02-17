import { cn } from '@/utils'
import React, { useCallback, useMemo, useState } from 'react'

interface Props {
  direction: 'vertical' | 'horizontal'
  length: number
  itemLength: number
  data: any[]
  renderItem: (item: any, index: number) => React.ReactNode
}

const VirtualList = ({ direction, length, itemLength, data, renderItem }: Props) => {
  const isVertical = direction === 'vertical'

  const [scrollPos, setScrollPos] = useState(0)

  const visibleMap = useMemo(() => {
    const visibleCount = Math.ceil(length / itemLength) + 1
    const startIndex = Math.floor(scrollPos / itemLength)
    return { start: startIndex, end: startIndex + visibleCount }
  }, [scrollPos, length, itemLength])

  const startOffset = useMemo(() => visibleMap.start * itemLength, [visibleMap, itemLength])

  const totalSize = useMemo(() => data.length * itemLength, [data, itemLength])

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      setScrollPos(isVertical ? target.scrollTop : target.scrollLeft)
    },
    [isVertical],
  )

  return (
    <div
      className={cn('relative', isVertical ? 'overflow-y-auto' : 'overflow-x-auto')}
      style={
        isVertical ? { height: `${length}px` } : { width: `${length}px`, whiteSpace: 'nowrap' }
      }
      onScroll={onScroll}>
      <div style={isVertical ? { height: `${totalSize}px` } : { width: `${totalSize}px` }}>
        <div
          style={
            isVertical
              ? { transform: `translateY(${startOffset}px)` }
              : { transform: `translateX(${startOffset}px)` }
          }>
          {data
            .slice(visibleMap.start, visibleMap.end)
            .map((item, index) => renderItem(item, index + visibleMap.start))}
        </div>
      </div>
    </div>
  )
}

export default VirtualList
