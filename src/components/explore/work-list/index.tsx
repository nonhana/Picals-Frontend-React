import { FC, useEffect, useState } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap, useAtBottom } from '@/hooks'
import { getRecommendWorksAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { likeActionsAPI } from '@/apis'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { CSSTransition } from 'react-transition-group'

const WorkList: FC = () => {
  const [loading, setLoading] = useState(true)
  const [workList, setWorkList, updateItem] = useMap<WorkNormalItemInfo>([])
  const [current, setCurrent] = useState(1)
  const atBottom = useAtBottom()
  const [isFinal, setIsFinal] = useState(false)

  const getRecommendWorks = async () => {
    setLoading(true)
    try {
      const { data } = await getRecommendWorksAPI({ pageSize: 30, current })
      if (data.length < 30) setIsFinal(true)
      setWorkList([...Array.from(workList.values()), ...data])
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (atBottom && !isFinal) setCurrent((prev) => prev + 1)
  }, [atBottom])

  useEffect(() => {
    getRecommendWorks()
  }, [current])

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    updateItem(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div className='relative w-full p-5 min-h-160'>
      <div className='title m-b-10px'>
        <span>推荐作品</span>
      </div>

      <CSSTransition
        in={workList.size !== 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-wrap gap-5'>
          {Array.from(workList.values()).map((work) => (
            <WorkNormalItem key={work.id} itemInfo={work} like={handleLike} />
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

export default WorkList
