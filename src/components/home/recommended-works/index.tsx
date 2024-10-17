import { likeActionsAPI } from '@/apis'
import Empty from '@/components/common/empty'
// import WorkNormalItem from '@/components/common/work-normal-item'
import WorkItem from '@/components/common/work-item'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { useMap } from '@/hooks'
import {
  pushToRecommendWorkList,
  resetOtherList,
  setCurrentList,
  setPrevPosition,
} from '@/store/modules/viewList'
import type { WorkNormalItemInfo } from '@/utils/types'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

type RecommendedWorksProps = {
  loading: boolean
  workList: WorkNormalItemInfo[]
}

const RecommendedWorks: FC<RecommendedWorksProps> = ({ loading, workList: sourceData }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [workList, setWorkList, setWorkMapList] = useMap<WorkNormalItemInfo>([])

  useEffect(() => {
    setWorkList(sourceData)
  }, [sourceData])

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    setWorkMapList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  const addRecommendWorks = () => {
    dispatch(resetOtherList())
    dispatch(pushToRecommendWorkList(sourceData.map((item) => item.id)))
    dispatch(setCurrentList('recommendWorkList'))
    dispatch(setPrevPosition(location.pathname + location.search))
  }

  return (
    <div className='relative p-5 min-h-160'>
      <div className='title m-b-10px'>
        <span>推荐作品</span>
      </div>

      <CSSTransition
        in={workList.size !== 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-wrap gap-5'>
          {Array.from(workList.values()).map((item) => (
            <WorkItem key={item.id} itemInfo={item} like={handleLike} onClick={addRecommendWorks} />
          ))}
        </div>
      </CSSTransition>

      <CSSTransition
        in={workList.size === 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty />
      </CSSTransition>

      <CSSTransition
        in={workList.size === 0 && loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <WorkListSkeleton className='absolute top-14' />
      </CSSTransition>
    </div>
  )
}

export default RecommendedWorks
