import { FC, useEffect, useRef, useState } from 'react'
import { getRandomBackgroundsAPI } from '@/apis'
import LazyImg from '@/components/common/lazy-img'
import { debounce } from 'lodash'

const BgSlide: FC = () => {
  const slideWindow = useRef<HTMLDivElement>(null)

  const [bgImgList, setBgImgList] = useState<string[]>([])
  const [chosenIdList, setChosenIdList] = useState<number[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const getRandomBackgrounds = async () => {
    if (isFetching) return
    setIsFetching(true)
    try {
      const { data } = await getRandomBackgroundsAPI({ chosenIdList })
      setBgImgList((prev) => prev.concat(data.result))
      setChosenIdList(data.chosenIdList)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    getRandomBackgrounds()
  }, [])

  useEffect(() => {
    const debouncedGetRandomBackgrounds = debounce(getRandomBackgrounds, 1000)
    debouncedGetRandomBackgrounds()
    if (chosenIdList.length === 10) {
      debouncedGetRandomBackgrounds.cancel()
    }
    return () => {
      debouncedGetRandomBackgrounds.cancel()
    }
  }, [chosenIdList])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index = index === bgImgList.length - 1 ? 0 : index + 1
      if (slideWindow.current) {
        slideWindow.current.style.transform = `translateX(-${index * 100}vw)`
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='absolute left-0 top-0 w-100vw h-100vh overflow-hidden'>
      {/* 阻止用户选中图片 */}
      <div className='absolute h-full w-full z-1' />
      <div ref={slideWindow} className='relative flex h-full transition-transform duration-500'>
        {bgImgList.map((bgImg, index) => (
          <LazyImg className='shrink-0' key={index} src={bgImg} alt='bg' />
        ))}
      </div>
    </div>
  )
}

export default BgSlide
