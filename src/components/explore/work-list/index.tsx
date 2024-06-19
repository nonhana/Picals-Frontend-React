import { FC, useEffect, useState } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap, useAtBottom } from '@/hooks'
import { getRecommendWorksAPI } from '@/apis'
import { message } from 'antd'
import Empty from '@/components/common/empty'
import { likeActionsAPI } from '@/apis'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { CSSTransition } from 'react-transition-group'

const WorkList: FC = () => {
  const [loading, setLoading] = useState(false)
  const [workList, setWorkList, updateItem] = useMap<WorkNormalItemInfo>([])
  const [current, setCurrent] = useState(1)

  const getRecommentWorks = async () => {
    try {
      setLoading(true)
      const { data } = await getRecommendWorksAPI({ pageSize: 30, current })
      if (data.length === 0) return message.info('暂时没有更多了...')
      setWorkList([...Array.from(workList.values()), ...data])
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecommentWorks()
  }, [current])

  const isBottom = useAtBottom()

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    updateItem(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  useEffect(() => {
    if (isBottom) {
      console.log('到达底部')
      setCurrent((prev) => prev + 1)
    }
  }, [isBottom])

  return (
    <div className='relative w-full p-5'>
      <div className='title m-b-10px'>
        <span>推荐作品</span>
      </div>

      <CSSTransition
        in={workList.size !== 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-wrap gap-20px'>
          {Array.from(workList.values()).map((item) => (
            <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
          ))}
        </div>
      </CSSTransition>

      {workList.size === 0 &&
        (loading ? (
          <div className='relative w-full'>
            <WorkListSkeleton />
          </div>
        ) : (
          <Empty />
        ))}
    </div>
  )
}

export default WorkList
