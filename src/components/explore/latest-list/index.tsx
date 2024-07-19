import { getLatestWorksAPI, likeActionsAPI } from '@/apis'
import WorkNormalItem from '@/components/common/work-normal-item'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { useAtBottom } from '@/hooks'
import {
  pushToLatestWorkList,
  resetOtherList,
  setCurrentList,
  setPrevPosition,
} from '@/store/modules/viewList'
import type { WorkNormalItemInfo } from '@/utils/types'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const LatestList: FC = () => {
  const location = useLocation()

  const dispatch = useDispatch()

  const [current, setCurrent] = useState(1)
  const [latestWorkList, setLatestWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([{ page: current, list: [] }])
  const atBottom = useAtBottom()
  const [isFinal, setIsFinal] = useState(false)

  const getLatestWorks = async () => {
    try {
      const { data } = await getLatestWorksAPI({ pageSize: 30, current })
      if (data.length < 30) setIsFinal(true)
      setLatestWorkList((prev) => {
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
    getLatestWorks()
  }, [current])

  const handleLike = async (page: number, id: string) => {
    await likeActionsAPI({ id })
    setLatestWorkList(
      latestWorkList.map((item) => {
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

  const addLatestWorks = () => {
    dispatch(resetOtherList())
    const result = latestWorkList.reduce((prev, current) => {
      return prev.concat(current.list.map((item) => item.id))
    }, [] as string[])
    dispatch(pushToLatestWorkList(result))
    dispatch(setCurrentList('latestWorkList'))
    dispatch(setPrevPosition(location.pathname + location.search))
  }

  return (
    <div className='relative w-full p-5 min-h-160'>
      <div className='title m-b-10px'>
        <span>最新发布</span>
      </div>

      {latestWorkList.map((everyPage) => (
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
                onClick={addLatestWorks}
              />
            ))}
          </div>
        </CSSTransition>
      ))}

      {!isFinal && <WorkListSkeleton row={1} />}
    </div>
  )
}

export default LatestList
