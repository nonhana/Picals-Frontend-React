import { debounce } from 'lodash'
import { useState, useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * @description 监听窗口变化，返回当前窗口宽度
 * @param target - 监听的目标元素
 * @returns - 当前窗口宽度
 */
function useWinChange(target: RefObject<HTMLElement>): number {
  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = debounce(() => {
      if (target.current) {
        setWidth(target.current.offsetWidth)
      }
    }, 20)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export { useWinChange }
