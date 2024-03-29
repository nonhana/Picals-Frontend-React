import { FC, useEffect, useState } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import { normalWorkList } from '@/test/data'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap, useAtBottom } from '@/hooks'

const WorkList: FC = () => {
  const [workList, setWorkList, updateItem] = useMap<WorkNormalItemInfo>([])
  const [currentPage, setCurrentPage] = useState(1)
  const isBottom = useAtBottom()

  const handleLike = (id: string) => {
    updateItem(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  useEffect(() => {
    setWorkList(normalWorkList)
  }, [])

  useEffect(() => {
    if (isBottom) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [isBottom])

  useEffect(() => {
    if (currentPage === 1) return
    setWorkList([...normalWorkList])
  }, [currentPage])

  return (
    <div className='relative p-5'>
      <div className='title m-b-10px'>
        <span>已关注用户新作</span>
      </div>

      <div className='relative w-full flex flex-wrap gap-20px'>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </div>
    </div>
  )
}

export default WorkList
