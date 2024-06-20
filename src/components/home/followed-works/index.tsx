import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import LayoutList from '@/components/common/layout-list'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks'
import type { WorkNormalItemInfo } from '@/utils/types'
import Empty from '@/components/common/empty'
import { likeActionsAPI } from '@/apis'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { CSSTransition } from 'react-transition-group'

type FollowedWorksProps = {
  loading: boolean
  workList: WorkNormalItemInfo[]
}

const FollowedWorks: FC<FollowedWorksProps> = ({ loading, workList: sourceData }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const [workList, setWorkList, updateWorkList] = useMap<WorkNormalItemInfo>([])

  useEffect(() => {
    setWorkList(sourceData)
  }, [sourceData])

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    updateWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div className='relative p-5 min-h-85'>
      <div className='title m-b-10px'>
        <span>已关注用户新作</span>
      </div>

      {isLogin ? (
        <>
          <CSSTransition
            in={workList.size !== 0 && !loading}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <LayoutList scrollType='work-normal' gap={20}>
              {Array.from(workList.values()).map((item) => (
                <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
              ))}
            </LayoutList>
          </CSSTransition>

          <CSSTransition
            in={workList.size === 0 && !loading}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <Empty text='emmm，看起来你还没关注用户，或者是你关注的用户没发布过作品' />
          </CSSTransition>

          <CSSTransition
            in={workList.size === 0 && loading}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <WorkListSkeleton row={1} className='absolute top-14' />
          </CSSTransition>
        </>
      ) : (
        <Empty text='还没登录，这里自然是空的' />
      )}
    </div>
  )
}

export default FollowedWorks
