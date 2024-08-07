import type { AppState } from '@/store/types'
import type { WorkNormalItemInfo } from '@/utils/types'
import { Icon } from '@iconify/react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import LazyImg from '../lazy-img'

type WorkLittleItemProps = {
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
  [key: string]: any
}

const activeClasses = 'bg-white opacity-16'

const WorkLittleItem: FC<WorkLittleItemProps> = ({ itemInfo, like, ...props }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { workId } = useParams<{ workId: string }>()

  return (
    <div
      {...props}
      className='shrink-0 relative w-118px h-118px rd-1 bg-white overflow-hidden select-none'>
      <div className='absolute top-0 left-0 w-full h-full z-1'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
          className={`cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-118px h-118px ${itemInfo.id === workId ? activeClasses : ''}`}
        />
        {isLogin && (
          <Icon
            className='p-10px absolute bottom-0 right-0 cursor-pointer'
            width='44px'
            color={itemInfo.isLiked ? 'red' : '#3d3d3d'}
            icon={itemInfo.isLiked ? 'ant-design:heart-filled' : 'ant-design:heart-outlined'}
            onClick={() => like(itemInfo.id)}
          />
        )}
      </div>
      <div className='relative w-118px h-118px rd-1 flex items-center justify-center overflow-hidden'>
        <LazyImg src={itemInfo.cover} alt={itemInfo.name} />
      </div>
    </div>
  )
}

export default WorkLittleItem
