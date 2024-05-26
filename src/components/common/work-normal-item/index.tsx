import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import type { WorkNormalItemInfo } from '@/utils/types'

type WorkNormalItemProps = {
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
}

const WorkNormalItem: FC<WorkNormalItemProps> = ({ itemInfo, like }) => {
  return (
    <div className='shrink-0 relative w-184px rd-1 bg-white overflow-hidden'>
      <div className='absolute top-0 left-0 w-184px h-184px z-99'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
          className='cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-184px h-184px'
        />
        {itemInfo.imgList.length > 1 && (
          <div className='absolute top-10px right-10px'>
            <div className='rd-full absolute w-full h-full bg-black opacity-8 z--1' />
            <div className='px-2 py-1 flex items-center gap-1'>
              <Icon width='12px' color='#ffffff' icon='ant-design:file-filled' />
              <span className='font-size-10px color-white'>{itemInfo.imgList.length}</span>
            </div>
          </div>
        )}
        <Icon
          className='p-10px absolute bottom-0 right-0 cursor-pointer'
          width='44px'
          color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
          icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-twotone'}
          onClick={() => like(itemInfo.id)}
        />
      </div>

      <div className='relative w-184px h-184px rd-1 flex items-center justify-center overflow-hidden'>
        <img className='w-full h-full object-cover' src={itemInfo.imgList[0]} alt={itemInfo.name} />
      </div>

      <div className='relative p-10px flex flex-col gap-5px'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
          className='cursor-pointer font-size-14px color-#3d3d3d font-bold'>
          <span>{itemInfo.name}</span>
        </Link>
        <div className='flex items-center gap-10px font-size-14px color-#6d757a'>
          <Link
            to={`/personal-center/${itemInfo.authorId}/works`}
            className='cursor-pointer w-6 h-6 rd-full overflow-hidden flex items-center justify-center'>
            <img
              className='w-full h-full object-cover'
              src={itemInfo.authorAvatar}
              alt={itemInfo.authorName}
            />
          </Link>
          <Link
            to={`/personal-center/${itemInfo.authorId}/works`}
            className='cursor-pointer color-#3d3d3d'>
            <span>{itemInfo.authorName}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WorkNormalItem
