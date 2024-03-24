import { FC } from 'react'
import LayoutList from '@/components/common/layout-list'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks/useMap'
import type { WorkNormalItemInfo } from '@/utils/types'

type FollowedWorksProps = {
  workList: WorkNormalItemInfo[]
}

const FollowedWorks: FC<FollowedWorksProps> = ({ workList: sourceData }) => {
  const [workList, setWorkList] = useMap<WorkNormalItemInfo>(sourceData)

  const handleLike = (id: string) => {
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div>
      <div>
        <span>已关注用户新作</span>
      </div>

      <LayoutList scrollAmount={800}>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </LayoutList>
    </div>
  )
}

export default FollowedWorks
