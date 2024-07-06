import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

const useAtBottom = (): boolean => {
  const [isBottom, setIsBottom] = useState(false)
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = document.body.scrollTop // 滚动高度
      const scrollHeight = document.body.scrollHeight // 滚动总高度
      const clientHeight = document.body.clientHeight // 可视区域高度

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (isBottom) return
        setIsBottom(true)
      } else {
        if (!isBottom) return
        setIsBottom(false)
      }
    }, 50)

    document.body.addEventListener('scroll', handleScroll)

    return () => document.body.removeEventListener('scroll', handleScroll)
  })
  return isBottom
}

const useAtBottomNoRerender = (eventCallback: (isBottom: boolean) => void) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight

      const isBottom = scrollTop + clientHeight >= scrollHeight - 100
      eventCallback(isBottom)
    }, 50)

    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [eventCallback])
}

export { useAtBottom, useAtBottomNoRerender }
