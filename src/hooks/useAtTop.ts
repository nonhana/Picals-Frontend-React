import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

// 判断是否在顶部
const useAtTop = (): boolean => {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = document.body.scrollTop // 滚动高度
      if (scrollTop <= 0) {
        if (isTop) return
        setIsTop(true)
      } else {
        if (!isTop) return
        setIsTop(false)
      }
    }, 50)

    document.body.addEventListener('scroll', handleScroll)

    return () => document.body.removeEventListener('scroll', handleScroll)
  })
  return isTop
}

export { useAtTop }
