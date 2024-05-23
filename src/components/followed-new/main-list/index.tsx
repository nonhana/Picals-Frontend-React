import { FC, useEffect, useState } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import { useMap } from '@/hooks/useMap'
import { getFollowNewWorksAPI } from '@/apis'
import Empty from '@/components/common/empty'

type MainListProps = {
  pageSize: number
  current: number
}

const MainList: FC<MainListProps> = ({ pageSize, current }) => {
  const [workList, setWorkList, setWorkMapList] = useMap<WorkNormalItemInfo>([])
  const [loading, setLoading] = useState(false)

  const getFollowNewWorks = async () => {
    try {
      setLoading(true)
      const { data } = await getFollowNewWorksAPI({ pageSize, current })
      setWorkList(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFollowNewWorks()
  }, [current, pageSize])

  const handleLike = (id: string) => {
    setWorkMapList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  useEffect(() => {
    console.log('current:', current)
  }, [current])

  return (
    <div className='relative w-full p-5'>
      <div className='title m-b-10px'>
        <span>已关注用户新作</span>
      </div>

      <div className='relative w-full flex flex-wrap gap-20px'>
        {Array.from(workList.values()).map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </div>

      {workList.size === 0 && !loading && (
        <Empty text='emmm，看起来你还没关注用户，或者是你关注的用户没发布过作品' />
      )}
    </div>
  )
}

export default MainList
