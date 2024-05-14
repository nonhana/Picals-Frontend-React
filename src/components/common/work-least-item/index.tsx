import { FC } from 'react'
import { Link } from 'react-router-dom'
import type { WorkNormalItemInfo } from '@/utils/types'

type WorkLeastItemProps = {
  itemInfo: WorkNormalItemInfo
}

const WorkLeastItem: FC<WorkLeastItemProps> = ({ itemInfo }) => {
  return (
    <div className='shrink-0 relative w-90px h-90px rd-1 bg-white overflow-hidden select-none'>
      <Link
        to={`/work-detail/${itemInfo.id}`}
        className='z-1 cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-90px h-90px'
      />

      <div className='relative w-90px h-90px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>
    </div>
  )
}

export default WorkLeastItem
