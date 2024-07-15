import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useAtBottom } from '@/hooks'
import { getRecommendWorksAPI } from '@/apis'
import { likeActionsAPI } from '@/apis'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { CSSTransition } from 'react-transition-group'
import {
  pushToRecommendWorkList,
  resetOtherList,
  setCurrentList,
  setPrevPosition,
} from '@/store/modules/viewList'

const WorkList: FC = () => {
  const location = useLocation()

  const dispatch = useDispatch()

  const [current, setCurrent] = useState(1)
  const [recommendWorkList, setRecommendWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([{ page: current, list: [] }])
  const atBottom = useAtBottom()
  const [isFinal, setIsFinal] = useState(false)

  const getRecommendWorks = async () => {
    try {
      const { data } = await getRecommendWorksAPI({ pageSize: 30, current })
      if (data.length < 30) setIsFinal(true)
      setRecommendWorkList((prev) => {
        const result = prev.map((item) => {
          if (item.page === current) {
            return { page: item.page, list: data }
          }
          return item
        })
        if (!isFinal) result.push({ page: current + 1, list: [] })
        return result
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (atBottom && !isFinal) setCurrent((prev) => prev + 1)
  }, [atBottom])

  useEffect(() => {
    getRecommendWorks()
  }, [current])

  const handleLike = async (page: number, id: string) => {
    await likeActionsAPI({ id })
    setRecommendWorkList(
      recommendWorkList.map((item) => {
        if (item.page === page) {
          return {
            page: item.page,
            list: item.list.map((work) => {
              if (work.id === id) {
                return { ...work, isLiked: !work.isLiked }
              }
              return work
            }),
          }
        }
        return item
      }),
    )
  }

  const addRecommendWorks = () => {
    dispatch(resetOtherList())
    const result = recommendWorkList.reduce((prev, current) => {
      return prev.concat(current.list.map((item) => item.id))
    }, [] as string[])
    dispatch(pushToRecommendWorkList(result))
    dispatch(setCurrentList('recommendWorkList'))
    dispatch(setPrevPosition(location.pathname + location.search))
  }

  return (
    <div className='relative w-full p-5 min-h-160'>
      <div className='title m-b-10px'>
        <span>推荐作品</span>
      </div>

      {recommendWorkList.map((everyPage) => (
        <CSSTransition
          key={everyPage.page}
          in={everyPage.list.length !== 0}
          timeout={300}
          classNames='opacity-gradient'
          unmountOnExit>
          <div className='relative w-full flex flex-wrap gap-5'>
            {everyPage.list.map((work) => (
              <WorkNormalItem
                key={work.id}
                itemInfo={work}
                like={(id) => handleLike(everyPage.page, id)}
                onClick={addRecommendWorks}
              />
            ))}
          </div>
        </CSSTransition>
      ))}

      {!isFinal && <WorkListSkeleton row={1} />}
    </div>
  )
}

export default WorkList
