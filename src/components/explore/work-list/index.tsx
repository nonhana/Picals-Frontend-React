import { getRecommendWorksAPI, likeActionsAPI } from '@/apis'
import { Pagination } from '@/apis/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { useAtBottom } from '@/hooks'
import { setTempId } from '@/store/modules/user'
import {
  pushToRecommendWorkList,
  resetOtherList,
  setCurrentList,
  setPrevPosition,
} from '@/store/modules/viewList'
import { AppState } from '@/store/types'
import { generateTempId } from '@/utils'
import type { WorkNormalItemInfo } from '@/utils/types'
import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const WorkList: FC = () => {
  const location = useLocation()

  const dispatch = useDispatch()
  const { tempId, isLogin } = useSelector((state: AppState) => state.user)

  const [current, setCurrent] = useState(1)
  const [recommendWorkList, setRecommendWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([{ page: current, list: [] }])
  const atBottom = useAtBottom()
  const [isFinal, setIsFinal] = useState(false)

  const getRecommendWorks = useCallback(async () => {
    try {
      const params: Pagination = { pageSize: 30, current }
      if (!isLogin) {
        if (!tempId) dispatch(setTempId(generateTempId()))
        params.id = tempId
      }
      const { data } = await getRecommendWorksAPI(params)
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
  }, [current, dispatch, isFinal, isLogin, tempId])

  useEffect(() => {
    if (atBottom && !isFinal) setCurrent((prev) => prev + 1)
  }, [atBottom, isFinal])

  useEffect(() => {
    getRecommendWorks()
  }, [getRecommendWorks])

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
