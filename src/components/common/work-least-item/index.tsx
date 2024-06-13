import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import type { WorkNormalItemInfo } from '@/utils/types'

type WorkLeastItemProps = {
  itemInfo: WorkNormalItemInfo
}

const activeClasses = 'bg-white opacity-16'

const WorkLeastItem: FC<WorkLeastItemProps> = ({ itemInfo }) => {
  const { workId } = useParams<{ workId: string }>()
  return (
    <div className='shrink-0 relative w-90px h-90px rd-1 bg-white overflow-hidden select-none'>
      <Link
        to={`/work-detail/${itemInfo.id}`}
        className={`z-1 cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-90px h-90px ${itemInfo.id === workId ? activeClasses : ''}`}
      />

      <div className='relative w-90px h-90px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.cover} alt={itemInfo.name} />
      </div>
    </div>
  )
}

export default WorkLeastItem
