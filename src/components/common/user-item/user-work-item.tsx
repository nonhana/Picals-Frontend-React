import { FC } from 'react'
import { Icon } from '@iconify/react'
import type { WorkNormalItemInfo } from '@/utils/types'

type UserWorkItemProps = {
  itemInfo: WorkNormalItemInfo
  like: (userId: string, workId: string) => void
}

const UserWorkItem: FC<UserWorkItemProps> = ({ itemInfo, like }) => {
  return (
    <div className='shrink-0 relative w-184px rd-1 bg-white overflow-hidden'>
      <div className='absolute top-0 left-0 w-184px h-184px z-99'>
        <div className='cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-184px h-184px' />
        <div className='absolute top-10px right-10px'>
          <div className='rd-full absolute w-full h-full bg-black opacity-8 z--1' />
          <div className='px-2 py-1 flex items-center gap-1'>
            <Icon width='12px' color='#ffffff' icon='ant-design:file-filled' />
            <span className='font-size-10px color-white'>{itemInfo.imgList.length}</span>
          </div>
        </div>
        <Icon
          className='absolute bottom-10px right-10px cursor-pointer'
          width='24px'
          color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
          icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
          onClick={() => like(itemInfo.authorId, itemInfo.id)}
        />
      </div>

      <div className='relative w-184px h-184px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>

      <div className='cursor-pointer font-size-14px color-#3d3d3d font-bold'>
        <span>{itemInfo.name}</span>
      </div>
    </div>
  )
}

export default UserWorkItem
