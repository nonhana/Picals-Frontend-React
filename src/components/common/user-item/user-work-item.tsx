import type { AppState } from '@/store/types'
import type { WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import LazyImg from '../lazy-img'

type UserWorkItemProps = {
  itemInfo: WorkNormalItemInfo
  like: (userId: string, workId: string) => void
}

const UserWorkItem: FC<UserWorkItemProps> = ({ itemInfo, like }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)

  return (
    <div className='shrink-0 relative h-51 w-184px flex flex-col justify-between rd-1 bg-white overflow-hidden'>
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
        {isLogin && (
          <Icon
            className='p-10px absolute bottom-0 right-0 cursor-pointer'
            width='44px'
            color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
            icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
            onClick={() => like(itemInfo.authorId, itemInfo.id)}
          />
        )}
      </div>

      <div className='relative w-184px h-184px rd-1 flex items-center justify-center overflow-hidden'>
        <LazyImg src={itemInfo.cover} alt={itemInfo.name} />
      </div>

      <Link
        to={`/work-detail/${itemInfo.id}`}
        className='w-full cursor-pointer font-size-m color-shallowblack font-bold whitespace-nowrap overflow-hidden text-ellipsis inline-block'>
        <span>{itemInfo.name ? itemInfo.name : '无题'}</span>
      </Link>
    </div>
  )
}

export default UserWorkItem
