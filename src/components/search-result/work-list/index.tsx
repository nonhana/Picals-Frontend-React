import { FC, useEffect, useState } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import { normalWorkList } from '@/test/data'
import { useMap } from '@/hooks/useMap'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'
import { Radio, RadioChangeEvent } from 'antd'

const sortOptions = [
  { label: '按最新排序', value: 'new' },
  { label: '按旧排序', value: 'old' },
  { label: '按点赞数排序', value: 'like' },
  { label: '按收藏数排序', value: 'collect' },
]

const WorkList: FC = () => {
  const [workList, _, setWorkList] = useMap<WorkNormalItemInfo>(normalWorkList)
  const [sortType, setSortType] = useState('new')

  const handleLike = (id: string) => {
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  const changeType = ({ target: { value } }: RadioChangeEvent) => {
    setSortType(value)
  }

  /* ----------分页相关--------- */
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 30
  const total = 1000

  const pageChange = (page: number) => {
    currentPage !== page && setCurrentPage(page)
  }

  useEffect(() => {
    console.log('currentPage:', currentPage)
  }, [currentPage])

  return (
    <div className='relative p-5'>
      <div className='w-100% flex justify-between items-center mb-10px'>
        <div className='flex gap-10px items-center'>
          <div className='title font-size-24px'>
            <span>插画</span>
          </div>
          <div className='px-10px py-5px bg-#858585 rd-full color-#fff font-size-14px font-bold'>
            <span>{total}</span>
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

      <div className='relative w-full flex flex-wrap gap-20px'>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </div>

      <div className='flex justify-center'>
        <Pagination total={total} pageSize={pageSize} current={currentPage} onChange={pageChange} />
      </div>
    </div>
  )
}

export default WorkList
