import { FC } from 'react'
import WorkRankItem from '@/components/common/work-rank-item'
import { useMap } from '@/hooks/useMap'
import type { WorkRankItemInfo } from '@/utils/types'
import LayoutList from '@/components/common/layout-list'

type RankingListProps = {
  workList: WorkRankItemInfo[]
}

const getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().split('T')[0]
}

const yesterday = getYesterday()

const RankingList: FC<RankingListProps> = ({ workList: sourceData }) => {
  const [workList, _, setWorkList] = useMap<WorkRankItemInfo>(sourceData)

  const handleLike = (id: string) => {
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
    </div>
  )
}

export default RankingList
