import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@/store/types'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks/useMap'
import { getFollowNewWorksAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { likeActionsAPI, getFollowNewWorksIdListAPI } from '@/apis'
import { CSSTransition } from 'react-transition-group'
import WorkListSkeleton from '@/components/skeleton/work-list'
import {
  pushToFollowingNewWorkList,
  resetOtherList,
  setCurrentList,
  setPrevPosition,
} from '@/store/modules/viewList'

type MainListProps = {
  pageSize: number
  current: number
}

const MainList: FC<MainListProps> = ({ pageSize, current }) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { isLogin } = useSelector((state: AppState) => state.user)
  const [workList, setWorkList, updateWorkList] = useMap<WorkNormalItemInfo>([])
  const [loading, setLoading] = useState(true)

  const getFollowNewWorks = async () => {
    setLoading(true)
    try {
      const { data } = await getFollowNewWorksAPI({ pageSize, current })
      setWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFollowNewWorks()
  }, [current, pageSize])

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    updateWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  const addFollowedNewWorkList = async () => {
    const { data } = await getFollowNewWorksIdListAPI()
    dispatch(resetOtherList())
    dispatch(pushToFollowingNewWorkList(data))
    dispatch(setCurrentList('followingNewWorkList'))
    dispatch(setPrevPosition(location.pathname))
  }

  return (
    <div className='relative w-full p-5 min-h-160'>
      <div className='title mb-10px'>
        <span>已关注用户新作</span>
      </div>

      {isLogin ? (
        <>
          <CSSTransition
            in={workList.size !== 0 && !loading}
            timeout={300}
            classNames='opacity-gradient'
            unmountOnExit>
            <div className='relative w-full flex flex-wrap gap-5'>
              {Array.from(workList.values()).map((item) => (
                <WorkNormalItem
                  key={item.id}
                  itemInfo={item}
                  like={handleLike}
                  onClick={addFollowedNewWorkList}
                />
              ))}
            </div>
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
            <WorkListSkeleton className='absolute top-14' />
          </CSSTransition>
        </>
      ) : (
        <Empty text='还没登录，这里自然是空的' />
      )}
    </div>
  )
}

export default MainList
