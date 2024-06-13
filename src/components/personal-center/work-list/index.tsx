import { FC, useEffect, useState, useContext } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'
import { getUserWorksListAPI, getUserLikeWorksAPI, likeActionsAPI, deleteWorkAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { useMap } from '@/hooks'
import { PersonalContext } from '@/pages/personal-center'
import { message } from 'antd'

type WorkListProps = {
  workCount: number
}

const WorkList: FC<WorkListProps> = ({ workCount }) => {
  const { userId, currentPath } = useContext(PersonalContext)

  const [current, setCurrent] = useState<number>(1)
  const [workList, setWorkList, setWorkMap, removeWork] = useMap<WorkNormalItemInfo>([])

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
      removeWork(workId)
      message.success('删除成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const getUserWorks = async () => {
    try {
      setWorkList([])
      const { data } = await getUserWorksListAPI({ id: userId!, current, pageSize: 30 })
      setWorkList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const getUserLikeWorks = async () => {
    try {
      setWorkList([])
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
    if (currentPath === 'works') getUserWorks()
    if (currentPath === 'likes') getUserLikeWorks()
  }, [userId, current, currentPath])

  return (
    <div className='relative w-100% flex gap-10px flex-wrap'>
      {workList.size === 0 ? (
        <Empty />
      ) : (
        <div className='relative w-full flex flex-wrap gap-5'>
          {Array.from(workList.values()).map((work) => (
            <WorkNormalItem key={work.id} itemInfo={work} like={likeWork} deleteWork={deleteWork} />
          ))}
        </div>
      )}

      <div className='relative mx-auto'>
        <Pagination total={workCount} pageSize={30} onChange={setCurrent} current={current} />
      </div>
    </div>
  )
}

export default WorkList
