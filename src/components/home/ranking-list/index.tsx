import { FC } from 'react'
import WorkRankItem from '@/components/common/work-rank-item'
import { useMap } from '@/hooks/useMap'
import type { WorkRankItemInfo } from '@/utils/types'
import LayoutList from '@/components/common/layout-list'
import { likeActionsAPI } from '@/apis'
import Empty from '@/components/common/empty'

type RankingListProps = {
  loading: boolean
  workList: WorkRankItemInfo[]
}

const getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().split('T')[0]
}

const yesterday = getYesterday()

const RankingList: FC<RankingListProps> = ({ loading, workList: sourceData }) => {
  const [workList, _, setWorkList] = useMap<WorkRankItemInfo>(sourceData)

  const handleLike = async (id: string) => {
    await likeActionsAPI({ id })
    setWorkList(id, { ...workList.get(id)!, isLiked: !workList.get(id)!.isLiked })
  }

  return (
    <div className='relative p-5'>
      <div className='title m-b-10px'>
        <span>{yesterday} 排行榜（每日更新~）</span>
      </div>

      <LayoutList scrollType='work-rank' gap={20}>
        {Array.from(workList.values()).map((item) => (
          <WorkRankItem key={item.id} itemInfo={item} like={handleLike} />
        ))}
      </LayoutList>

      {workList.size === 0 && !loading && <Empty text='emmm，昨日没有作品上榜哦~' />}
    </div>
  )
}

export default RankingList
