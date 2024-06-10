import { FC, useEffect, useState } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import { useMap } from '@/hooks/useMap'
import WorkNormalItem from '@/components/common/work-normal-item'
import Pagination from '@/components/common/pagination'
import { Radio, RadioChangeEvent } from 'antd'
import { likeActionsAPI, searchWorksByLabelAPI } from '@/apis'
import Empty from '@/components/common/empty'

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
  const [sortType, setSortType] = useState(URLSortType)

  /* ----------分页相关--------- */
  const [current, setCurrent] = useState(1)

  const pageChange = (page: number) => {
    current !== page && setCurrent(page)
  }

  useEffect(() => {
    console.log('current:', current)
  }, [current])

  /* ----------作品列表相关--------- */
  const [workList, setWorkList, updateWorkList] = useMap<WorkNormalItemInfo>([])

  const searchWorksByLabel = async () => {
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

  const changeType = ({ target: { value } }: RadioChangeEvent) => setSortType(value)

  return (
    <div className='relative p-5 w-full'>
      <div className='w-100% flex justify-between items-center mb-10px'>
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

      <div className='relative w-full flex flex-wrap gap-20px'>
        {workList.size === 0 ? (
          <Empty text='暂无数据' />
        ) : (
          <>
            {Array.from(workList.values()).map((item) => (
              <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
            ))}
          </>
        )}
      </div>

      <div className='flex justify-center'>
        <Pagination total={workCount} pageSize={30} current={current} onChange={pageChange} />
      </div>
    </div>
  )
}

export default WorkList
