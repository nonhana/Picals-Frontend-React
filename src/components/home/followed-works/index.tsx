import { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import LayoutList from '@/components/common/layout-list'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks'
import type { WorkNormalItemInfo } from '@/utils/types'
import Empty from '@/components/common/empty'
import { likeActionsAPI } from '@/apis'

type FollowedWorksProps = {
  loading: boolean
  workList: WorkNormalItemInfo[]
}

const FollowedWorks: FC<FollowedWorksProps> = ({ loading, workList: sourceData }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const [workList, _, setWorkList] = useMap<WorkNormalItemInfo>(sourceData)

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div className='relative p-5'>
      <div className='title m-b-10px'>
        <span>已关注用户新作</span>
      </div>

      {isLogin ? (
        <>
          <LayoutList scrollType='work-normal' gap={20}>
            {Array.from(workList.values()).map((item) => (
              <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
            ))}
          </LayoutList>

          {workList.size === 0 && !loading && (
            <Empty text='emmm，看起来你还没关注用户，或者是你关注的用户没发布过作品' />
          )}
        </>
      ) : (
        <Empty text='还没登录，这里自然是空的' />
      )}
    </div>
  )
}

export default FollowedWorks
