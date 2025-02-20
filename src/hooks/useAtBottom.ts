import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

function useAtBottom(): boolean {
  const [isBottom, setIsBottom] = useState(false)
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = document.body.scrollTop // 滚动高度
      const scrollHeight = document.body.scrollHeight // 滚动总高度
      const clientHeight = document.body.clientHeight // 可视区域高度

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (isBottom)
          return
        setIsBottom(true)
      }
      else {
        if (!isBottom)
          return
        setIsBottom(false)
      }
    }, 50)

    document.body.addEventListener('scroll', handleScroll)

    return () => document.body.removeEventListener('scroll', handleScroll)
  })
  return isBottom
}

export { useAtBottom }
