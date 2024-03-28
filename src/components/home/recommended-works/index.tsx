import { FC } from 'react'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks/useMap'
import type { WorkNormalItemInfo } from '@/utils/types'

type RecommendedWorksProps = {
  workList: WorkNormalItemInfo[]
}

const RecommendedWorks: FC<RecommendedWorksProps> = ({ workList: sourceData }) => {
  const [workList, _, setWorkList] = useMap<WorkNormalItemInfo>(sourceData)

  const handleLike = (id: string) => {
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div className='relative p-5'>
      <div className='title m-b-10px'>
        <span>推荐作品</span>
      </div>

      <div className='relative w-full flex flex-wrap gap-20px'>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedWorks
