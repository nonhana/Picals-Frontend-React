import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import type { WorkNormalItemInfo } from '@/utils/types'
import { useMap } from '@/hooks'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'
import { message, Radio, RadioChangeEvent } from 'antd'
import { likeActionsAPI, searchWorksByLabelAPI, searchWorksIdListAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { CSSTransition } from 'react-transition-group'
import WorkListSkeleton from '@/components/skeleton/work-list'
import {
  pushToSearchResultWorkList,
  resetOtherList,
  setCurrentList,
  setPrevPosition,
} from '@/store/modules/viewList'
import { VIEW_LIST_MAP } from '@/utils'

const sortOptions = [
  { label: '按最新排序', value: 'new' },
  { label: '按旧排序', value: 'old' },
  { label: '按点赞数排序', value: 'like' },
  { label: '按收藏数排序', value: 'collect' },
]

type WorkListProps = {
  sortType: string
  labelName: string
  workCount: number
}

const WorkList: FC<WorkListProps> = ({ labelName, sortType: URLSortType, workCount }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [sortType, setSortType] = useState(URLSortType)

  useEffect(() => {
    setSortType(URLSortType)
  }, [URLSortType])

  /* ----------分页相关--------- */
  const [current, setCurrent] = useState(1)

  const pageChange = (page: number) => {
    current !== page && setCurrent(page)
  }

  /* ----------作品列表相关--------- */
  const [workList, setWorkList, updateWorkList] = useMap<WorkNormalItemInfo>([])
  const [gettingWorkList, setGettingWorkList] = useState(true)

  const searchWorksByLabel = async () => {
    setGettingWorkList(true)
    try {
      const { data } = await searchWorksByLabelAPI({
        labelName,
        sortType,
        current,
        pageSize: 30,
      })
      setWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingWorkList(false)
    }
  }

  useEffect(() => {
    searchWorksByLabel()
  }, [labelName, sortType, current])

  const handleLike = async (id: string) => {
    try {
      await likeActionsAPI({ id })
      updateWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const changeType = ({ target: { value } }: RadioChangeEvent) => {
    navigate({
      search: `?label=${labelName}&type=work&sortType=${value}`,
    })
  }

  const addSearchResultWorks = async () => {
    const { data } = await searchWorksIdListAPI({
      labelName,
      sortType,
    })
    dispatch(resetOtherList())
    dispatch(pushToSearchResultWorkList(data))
    dispatch(setCurrentList('searchResultWorkList'))
    dispatch(setPrevPosition(location.pathname + location.search))
    message.success(`成功进入至 ${VIEW_LIST_MAP['searchResultWorkList']}`)
  }

  return (
    <div className='relative p-5 w-full min-h-180 pb-15'>
      <div className='w-full flex justify-between items-center mb-10px'>
        <div className='flex gap-10px items-center'>
          <div className='title font-size-24px'>
            <span>插画</span>
          </div>
          <div className='px-10px py-5px bg-#858585 rd-full color-white font-size-14px font-bold'>
            <span>{workCount}</span>
          </div>
        </div>
        <Radio.Group
          options={sortOptions}
          onChange={changeType}
          value={sortType}
          optionType='button'
          buttonStyle='solid'
        />
      </div>

      <CSSTransition
        in={workList.size !== 0 && !gettingWorkList}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-wrap gap-20px'>
          {Array.from(workList.values()).map((item) => (
            <WorkNormalItem
              key={item.id}
              itemInfo={item}
              like={handleLike}
              onClick={addSearchResultWorks}
            />
          ))}
        </div>
      </CSSTransition>

      <CSSTransition
        in={workList.size === 0 && !gettingWorkList}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty />
      </CSSTransition>

      <CSSTransition
        in={workList.size === 0 && gettingWorkList}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <WorkListSkeleton className='absolute top-14' />
      </CSSTransition>

      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <Pagination total={workCount} pageSize={30} current={current} onChange={pageChange} />
      </div>
    </div>
  )
}

export default WorkList
