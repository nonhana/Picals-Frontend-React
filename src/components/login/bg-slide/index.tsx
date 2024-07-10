import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { getRandomBackgroundsAPI } from '@/apis'
import LazyImg from '@/components/common/lazy-img'
import { debounce } from 'lodash'

const BgSlide: FC = () => {
  const slideWindow = useRef<HTMLDivElement>(null)
  const bgImgListRef = useRef<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [bgImgList, setBgImgList] = useState<string[]>([])
  const [chosenIdList, setChosenIdList] = useState<number[]>([])
  const [loadedImgs, setLoadedImgs] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [_, setIndex] = useState(0)

  const getRandomBackgrounds = useCallback(async () => {
    if (isFetching) return
    setIsFetching(true)
    try {
      const { data } = await getRandomBackgroundsAPI({ chosenIdList })
      setBgImgList((prev) => {
        const newBgImgList = prev.concat(data.result)
        bgImgListRef.current = newBgImgList
        return newBgImgList
      })
      setChosenIdList(data.chosenIdList)
    } catch (error) {
      console.log('出现错误了喵！！', error)
    } finally {
      setIsFetching(false)
    }
  }, [isFetching, chosenIdList])

  useEffect(() => {
    getRandomBackgrounds()
  }, [getRandomBackgrounds])

  useEffect(() => {
    const debouncedGetRandomBackgrounds = debounce(getRandomBackgrounds, 1000)
    if (chosenIdList.length < 10) {
      debouncedGetRandomBackgrounds()
    }
    return () => {
      debouncedGetRandomBackgrounds.cancel()
    }
  }, [chosenIdList, getRandomBackgrounds])

  const imgLoaded = useCallback(
    (url: string) => {
      setLoadedImgs((prev) => {
        if (prev.includes(url)) return prev
        return [...prev, url]
      })
      if (loadedImgs.length + 1 === bgImgList.length) {
        setIsPaused(false)
      }
    },
    [loadedImgs.length, bgImgList.length],
  )

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = prevIndex === bgImgListRef.current.length - 1 ? 0 : prevIndex + 1
          if (slideWindow.current) {
            slideWindow.current.style.transform = `translateX(-${newIndex * 100}vw)`
          }
          return newIndex
        })
      }, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  return (
    <div className='absolute left-0 top-0 w-100vw h-100vh overflow-hidden'>
      {/* 阻止用户选中图片 */}
      <div className='absolute h-full w-full z-1' />
      <div ref={slideWindow} className='relative flex h-full transition-transform duration-500'>
        {bgImgList.map((bgImg) => (
          <LazyImg imgLoaded={imgLoaded} className='shrink-0' key={bgImg} src={bgImg} alt={bgImg} />
        ))}
      </div>
    </div>
  )
}

export default BgSlide
