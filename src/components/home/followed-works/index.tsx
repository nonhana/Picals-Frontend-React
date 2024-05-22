import { FC } from 'react'
import LayoutList from '@/components/common/layout-list'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks'
import type { WorkNormalItemInfo } from '@/utils/types'
import Empty from '@/components/common/empty'

type FollowedWorksProps = {
  loading: boolean
  workList: WorkNormalItemInfo[]
}

const FollowedWorks: FC<FollowedWorksProps> = ({ loading, workList: sourceData }) => {
  const [workList, _, setWorkList] = useMap<WorkNormalItemInfo>(sourceData)

  const handleLike = (id: string) => {
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div className='relative p-5'>
      <div className='title m-b-10px'>
        <span>已关注用户新作</span>
      </div>

      <LayoutList scrollType='work-normal' gap={20}>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </LayoutList>

      {workList.size === 0 && !loading && (
        <Empty text='emmm，看起来你还没关注用户，或者是你关注的用户没发布过作品' />
      )}
    </div>
  )
}

export default FollowedWorks
