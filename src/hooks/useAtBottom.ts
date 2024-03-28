import { useEffect, useState } from 'react'

const useAtBottom = (): boolean => {
  const [isBottom, setIsBottom] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (isBottom) return
        setIsBottom(true)
      } else {
        if (!isBottom) return
        setIsBottom(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  return isBottom
}

export { useAtBottom }
