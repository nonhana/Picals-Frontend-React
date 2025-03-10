import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

// 判断是否在顶部
function useAtTop(): boolean {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = document.body.scrollTop // 滚动高度
      if (scrollTop <= 0) {
        if (isTop)
          return
        setIsTop(true)
      }
      else {
        if (!isTop)
          return
        setIsTop(false)
      }
    }, 50)

    document.body.addEventListener('scroll', handleScroll)

    return () => document.body.removeEventListener('scroll', handleScroll)
  })
  return isTop
}

function useAtTopNoRerender(eventCallback: (isTop: boolean) => void) {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = document.body.scrollTop
      if (scrollTop <= 0) {
        eventCallback(true)
      }
      else {
        eventCallback(false)
      }
    }, 50)
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [eventCallback])
}

export { useAtTop, useAtTopNoRerender }
