import { FC, useEffect, useRef } from 'react'
import Bg1 from '@/assets/imgs/bg-1.jpg'
import Bg2 from '@/assets/imgs/bg-2.jpg'
import Bg3 from '@/assets/imgs/bg-3.jpg'
import Bg4 from '@/assets/imgs/bg-4.jpg'
import Bg5 from '@/assets/imgs/bg-5.jpg'

const bgImgList: string[] = [Bg1, Bg2, Bg3, Bg4, Bg5]

const BgSlide: FC = () => {
  const slideWindow = useRef<HTMLDivElement>(null)

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
          <img key={index} src={bgImg} alt='bg' className='shrink-0 w-100% h-100% object-cover' />
        ))}
      </div>
    </div>
  )
}

export default BgSlide
