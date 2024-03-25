import { FC, useEffect, useRef, useState } from 'react'
import LabelList from '@/components/home/label-list/index'
import FollowedWorks from '@/components/home/followed-works'
import RecommendedWorks from '@/components/home/recommended-works'
import { labelList, normalWorkList } from '@/test/data'
import { debounce } from 'lodash'

const Home: FC = () => {
  const [width, setWidth] = useState<number>(1245)
  const homeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = debounce(() => {
      if (homeRef.current) {
        const currentWidth = homeRef.current.offsetWidth
        if (currentWidth < 1305) {
          setWidth(1040)
        } else {
          setWidth(1245)
        }
      }
    }, 50)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={homeRef} className='relative w-100% mt-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col mx-auto'>
        <LabelList labelList={labelList} />
        <FollowedWorks workList={normalWorkList} />
        <RecommendedWorks workList={normalWorkList} />
      </div>
    </div>
  )
}

export default Home
