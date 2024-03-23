import { FC } from 'react'
import type { WorkNormalItemInfo } from '@/utils/types'

type WorkLeastItemProps = {
  itemInfo: WorkNormalItemInfo
}

const WorkLeastItem: FC<WorkLeastItemProps> = ({ itemInfo }) => {
  return (
    <div className='relative w-90px h-90px rd-1 bg-white overflow-hidden select-none'>
      <div className='absolute top-0 left-0 w-full h-full z-99'>
        <div className='cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-184px h-184px' />
      </div>

      <div className='relative w-90px h-90px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>
    </div>
  )
}

export default WorkLeastItem
