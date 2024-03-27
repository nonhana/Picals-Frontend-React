import { FC, useEffect } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import { normalWorkList } from '@/test/data'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks/useMap'

type MainListProps = {
  currentPage: number
}

const MainList: FC<MainListProps> = ({ currentPage }) => {
  const [workList, _, setWorkList] = useMap<WorkNormalItemInfo>(normalWorkList)

  const handleLike = (id: string) => {
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  useEffect(() => {
    console.log('currentPage:', currentPage)
  }, [currentPage])

  return (
    <div className='relative p-5'>
      <div className='title m-b-10px'>
        <span>已关注用户新作</span>
      </div>

      <div className='relative w-full flex flex-wrap gap-20px'>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </div>
    </div>
  )
}

export default MainList
