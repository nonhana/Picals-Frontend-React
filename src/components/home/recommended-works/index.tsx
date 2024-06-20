import { FC, useEffect } from 'react'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks/useMap'
import type { WorkNormalItemInfo } from '@/utils/types'
import Empty from '@/components/common/empty'
import { likeActionsAPI } from '@/apis'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { CSSTransition } from 'react-transition-group'

type RecommendedWorksProps = {
  loading: boolean
  workList: WorkNormalItemInfo[]
}

const RecommendedWorks: FC<RecommendedWorksProps> = ({ loading, workList: sourceData }) => {
  const [workList, setWorkList, setWorkMapList] = useMap<WorkNormalItemInfo>([])
  useEffect(() => {
    setWorkList(sourceData)
  }, [sourceData])

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    setWorkMapList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
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
            <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
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
