import { useState, useEffect } from 'react'
import type { RefObject } from 'react'
import { debounce } from 'lodash'

function useWinChange(target: RefObject<HTMLElement>): number {
  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = debounce(() => {
      if (target.current) {
        setWidth(target.current.offsetWidth)
      }
    }, 50)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export { useWinChange }
