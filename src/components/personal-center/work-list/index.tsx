import { FC, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'
import { getUserWorksListAPI, getUserLikeWorksAPI, likeActionsAPI } from '@/apis'

type WorkListProps = {
  workCount: number
}

const WorkList: FC<WorkListProps> = ({ workCount }) => {
  const location = useLocation()
  const { userId } = useParams<{ userId: string }>()
  const [current, setCurrent] = useState<number>(1)
  const [workList, setWorkList] = useState<WorkNormalItemInfo[]>()

  const likeWork = async (workId: string) => {
    try {
      await likeActionsAPI({ id: workId })
      setWorkList(
        workList?.map((work) => {
          if (work.id === workId) {
            return { ...work, isLiked: !work.isLiked }
          }
          return work
        }),
      )
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const getUserWorks = async () => {
    try {
      const { data } = await getUserWorksListAPI({ id: userId!, current, pageSize: 30 })
      setWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const getUserLikeWorks = async () => {
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
    }
  }

  useEffect(() => {
    const currentPath = location.pathname.split('/')[3]
    if (currentPath === 'works') getUserWorks()
    if (currentPath === 'likes') getUserLikeWorks()
  }, [userId, current, location.pathname])

  return (
    <div className='relative w-100% flex gap-10px flex-wrap'>
      <div className='relative w-full flex flex-wrap gap-5'>
        {workList?.map((work) => <WorkNormalItem key={work.id} itemInfo={work} like={likeWork} />)}
      </div>

      <div className='relative mx-auto'>
        <Pagination pageSize={30} total={workCount || 0} onChange={setCurrent} current={current} />
      </div>
    </div>
  )
}

export default WorkList
