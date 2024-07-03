import { FC, useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'
import {
  getUserWorksListAPI,
  getUserLikeWorksAPI,
  likeActionsAPI,
  deleteWorkAPI,
  getUserLikeWorksIdListAPI,
} from '@/apis'
import Empty from '@/components/common/empty'
import { useMap } from '@/hooks'
import { PersonalContext } from '@/pages/personal-center'
import { message } from 'antd'
import { CSSTransition } from 'react-transition-group'
import WorkListSkeleton from '@/components/skeleton/work-list'
import { pushToLikeWorkList, resetOtherList, setCurrentList } from '@/store/modules/viewList'

type WorkListProps = {
  workCount: number
  getWorkCount: () => Promise<void>
}

const WorkList: FC<WorkListProps> = ({ workCount, getWorkCount }) => {
  const dispatch = useDispatch()

  const { userId, currentPath } = useContext(PersonalContext)

  const [current, setCurrent] = useState<number>(1)
  const [workList, setWorkList, setWorkMap] = useMap<WorkNormalItemInfo>([])

  const likeWork = async (workId: string) => {
    try {
      await likeActionsAPI({ id: workId })
      setWorkMap(workId, { ...workList.get(workId)!, isLiked: !workList.get(workId)!.isLiked })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const deleteWork = async (workId: string) => {
    try {
      await deleteWorkAPI({ id: workId })
      await refreshWorkList()
      message.success('删除成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const [gettingWorkList, setGettingWorkList] = useState(true)

  const getUserWorks = async () => {
    setGettingWorkList(true)
    try {
      const { data } = await getUserWorksListAPI({ id: userId!, current, pageSize: 30 })
      setWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingWorkList(false)
    }
  }

  const getUserLikeWorks = async () => {
    setGettingWorkList(true)
    try {
      const { data } = await getUserLikeWorksAPI({
        id: userId!,
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

  const refreshWorkList = async () => {
    await getWorkCount()
    if (currentPath === 'works') await getUserWorks()
    if (currentPath === 'likes') await getUserLikeWorks()
  }

  useEffect(() => {
    refreshWorkList()
  }, [current, currentPath])

  useEffect(() => {
    if (userId) setCurrent(1)
  }, [userId])

  const addWorks = async () => {
    if (currentPath === 'works') {
      dispatch(resetOtherList())
      dispatch(setCurrentList('userWorkList'))
    } else {
      const { data } = await getUserLikeWorksIdListAPI({ id: userId! })
      dispatch(resetOtherList())
      dispatch(pushToLikeWorkList(data))
      dispatch(setCurrentList('likeWorkList'))
    }
  }

  return (
    <div className='relative w-full min-h-160 pb-15'>
      <CSSTransition
        in={workList.size !== 0 && !gettingWorkList}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-wrap gap-5'>
          {Array.from(workList.values()).map((work) => (
            <WorkNormalItem
              key={work.id}
              itemInfo={work}
              like={likeWork}
              deleteWork={deleteWork}
              onClick={addWorks}
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
        <WorkListSkeleton className='absolute top-0' />
      </CSSTransition>

      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <Pagination total={workCount} pageSize={30} onChange={setCurrent} current={current} />
      </div>
    </div>
  )
}

export default WorkList
