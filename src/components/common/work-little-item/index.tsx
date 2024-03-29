import { FC } from 'react'
import { Icon } from '@iconify/react'
import type { WorkNormalItemInfo } from '@/utils/types'

type WorkLittleItemProps = {
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
}

const WorkLittleItem: FC<WorkLittleItemProps> = ({ itemInfo, like }) => {
  return (
    <div className='relative w-118px h-118px rd-1 bg-white overflow-hidden select-none'>
      <div className='absolute top-0 left-0 w-full h-full z-99'>
        <div className='cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-184px h-184px' />
        <Icon
          className='absolute bottom-10px right-10px cursor-pointer'
          width='24px'
          color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
          icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
          onClick={() => like(itemInfo.id)}
        />
      </div>

      <div className='relative w-118px h-118px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>
    </div>
  )
}

export default WorkLittleItem
