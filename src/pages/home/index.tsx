import { FC, useEffect, useRef, useState } from 'react'
import { useWinChange } from '@/hooks'
import LabelList from '@/components/home/label-list/index'
import FollowedWorks from '@/components/home/followed-works'
import RecommendedWorks from '@/components/home/recommended-works'
import RankingList from '@/components/home/ranking-list'
import { labelList, normalWorkList, rankWorkList } from '@/test/data'

const Home: FC = () => {
  const [width, setWidth] = useState<number>(1245)
  const homeRef = useRef<HTMLDivElement>(null)
  const currentWidth = useWinChange(homeRef)

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  return (
    <div ref={homeRef} className='relative w-100% mt-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col mx-auto'>
        <LabelList labelList={labelList} />
        <FollowedWorks workList={normalWorkList} />
        <RecommendedWorks workList={normalWorkList} />
        <RankingList workList={rankWorkList} />
      </div>
    </div>
  )
}

export default Home
