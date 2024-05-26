import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { WorkNormalItemInfo } from '@/utils/types'
import { normalWorkList } from '@/test/data'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'

const WorkList: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [workCount, setWorkCount] = useState<number>()
  const [current, setCurrent] = useState<number>(1)
  const [workList, setWorkList] = useState<WorkNormalItemInfo[]>()

  const likeWork = (workId: string) => {
    console.log('like work', workId)
  }

  useEffect(() => {
    setWorkList(normalWorkList)
    setWorkCount(1000)
    setCurrent(1)
  }, [userId])

  return (
    <div className='relative w-100% flex gap-10px flex-wrap'>
      <div className='flex flex-wrap gap-5'>
        {workList?.map((work) => <WorkNormalItem key={work.id} itemInfo={work} like={likeWork} />)}
      </div>

      <div className='relative mx-auto'>
        <Pagination pageSize={30} total={workCount || 0} onChange={setCurrent} current={current} />
      </div>
    </div>
  )
}

export default WorkList
