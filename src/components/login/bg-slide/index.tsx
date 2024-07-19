import { getRandomBackgroundsAPI } from '@/apis'
import LazyImg from '@/components/common/lazy-img'
import { debounce } from 'lodash'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

const BgSlide: FC = () => {
  const slideWindow = useRef<HTMLDivElement>(null)
  const bgImgListRef = useRef<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [bgImgList, setBgImgList] = useState<string[]>([])
  const [chosenIdList, setChosenIdList] = useState<number[]>([])
  const [loadedImgs, setLoadedImgs] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [index, setIndex] = useState(0)

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
      return
    } finally {
      setIsFetching(false)
    }
  }, [chosenIdList, isFetching])

  useEffect(() => {
    getRandomBackgrounds()
  }, [getRandomBackgrounds])

  useEffect(() => {
    const debouncedGetRandomBackgrounds = debounce(getRandomBackgrounds, 1000)
    debouncedGetRandomBackgrounds()
    if (chosenIdList.length === 10) {
      debouncedGetRandomBackgrounds.cancel()
    }
    return () => {
      debouncedGetRandomBackgrounds.cancel()
    }
  }, [chosenIdList, getRandomBackgrounds])

  const imgLoaded = (url: string) => {
    setLoadedImgs((prev) => {
      if (prev.includes(url)) return prev
      return [...prev, url]
    })
  }

  useEffect(() => {
    if (loadedImgs.length <= index) {
      setIsPaused(true)
    } else {
      setIsPaused(false)
    }
  }, [loadedImgs, index])

  const slideImg = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === bgImgListRef.current.length - 1 ? 0 : prevIndex + 1
      if (slideWindow.current) {
        slideWindow.current.style.transform = `translateX(-${newIndex * 100}vw)`
      }
      return newIndex
    })
  }

  useEffect(() => {
    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current)
    } else {
      if (!isPaused) {
        intervalRef.current = setInterval(slideImg, 5000)
      }
    }
    return () => clearInterval(intervalRef.current!)
  }, [isPaused])

  return (
    <div className='absolute left-0 top-0 w-100vw h-100vh overflow-hidden'>
      {/* 阻止用户选中图片 */}
      <div className='absolute h-full w-full z-1' />
      <div ref={slideWindow} className='relative flex h-full transition-transform duration-500'>
        {bgImgList.map((bgImg, idx) => (
          <LazyImg imgLoaded={imgLoaded} className='shrink-0' key={idx} src={bgImg} alt={bgImg} />
        ))}
      </div>
    </div>
  )
}

export default BgSlide
