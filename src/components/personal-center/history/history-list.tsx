import { getViewHistoryAPI, getViewHistoryTotalAPI } from '@/apis'
import type { HistoryItem } from '@/apis/types'
import Empty from '@/components/common/empty'
import GreyButton from '@/components/common/grey-button'
import Pagination from '@/components/common/pagination'
import WorkHistoryItem from '@/components/common/work-history-item'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { resetOtherList, setCurrentList, setPrevPosition } from '@/store/modules/viewList'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const HistoryList: FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD')) // 当前日期
  const [workCount, setWorkCount] = useState<number>(0) // 当天浏览记录总数

  // 选择日期
  const changeDate = (type?: 'forward' | 'backward') => {
    switch (type) {
      case 'forward':
        setCurrentDate(dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD'))
        break
      case 'backward':
        setCurrentDate(dayjs(currentDate).subtract(1, 'day').format('YYYY-MM-DD'))
        break
      default:
        setCurrentDate(dayjs(type).format('YYYY-MM-DD'))
        break
    }
  }

  // 获取某一天的浏览记录总数
  const getHistoryCount = async () => {
    try {
      const { data } = await getViewHistoryTotalAPI({ date: currentDate })
      setWorkCount(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getHistoryCount()
  }, [currentDate])

  /* ----------作品列表相关---------- */
  const [gettingWorkList, setGettingWorkList] = useState<boolean>(true)
  const [workList, setWorkList] = useState<HistoryItem[]>([])
  const [current, setCurrent] = useState(1)

  // 获取某一天的浏览记录
  const getHistoryList = async () => {
    setGettingWorkList(true)
    try {
      const { data } = await getViewHistoryAPI({
        date: currentDate,
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
    getHistoryList()
  }, [currentDate, current])

  const addWorks = () => {
    dispatch(resetOtherList())
    dispatch(setCurrentList('userWorkList'))
    dispatch(setPrevPosition(location.pathname + location.search))
  }

  return (
    <>
      <div className='relative w-full flex justify-between items-center pb-2.5 mb-5 b-b-solid b-2 b-deepgrey'>
        <div className='flex items-center gap-5'>
          <Icon width='32px' color='#858585' icon='ant-design:clock-circle-twotone' />
          <span className='title color-deepgrey select-none'>{currentDate}</span>
        </div>
        <div className='flex items-center gap-5'>
          <GreyButton onClick={() => changeDate('backward')}>
            <Icon color='#fff' icon='ant-design:caret-left-filled' />
          </GreyButton>
          <GreyButton
            disabled={dayjs(currentDate).isSame(dayjs().format('YYYY-MM-DD'))}
            onClick={() => changeDate('forward')}>
            <Icon color='#fff' icon='ant-design:caret-right-filled' />
          </GreyButton>
        </div>
      </div>

      <div className='relative w-full min-h-160 pb-15'>
        <CSSTransition
          in={workList.length !== 0 && !gettingWorkList}
          timeout={300}
          classNames='opacity-gradient'
          unmountOnExit>
          <div className='relative w-full flex flex-wrap gap-5'>
            {Array.from(workList.values()).map((work) => (
              <WorkHistoryItem key={work.id} itemInfo={work} onClick={addWorks} />
            ))}
          </div>
        </CSSTransition>

        <CSSTransition
          in={workList.length === 0 && !gettingWorkList}
          timeout={300}
          classNames='opacity-gradient'
          unmountOnExit>
          <Empty />
        </CSSTransition>

        <CSSTransition
          in={workList.length === 0 && gettingWorkList}
          timeout={300}
          classNames='opacity-gradient'
          unmountOnExit>
          <WorkListSkeleton className='absolute top-0' />
        </CSSTransition>

        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
          <Pagination total={workCount} pageSize={30} onChange={setCurrent} current={current} />
        </div>
      </div>
    </>
  )
}

export default HistoryList
