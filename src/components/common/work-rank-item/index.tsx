import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { Icon } from '@iconify/react'
import type { WorkRankItemInfo } from '@/utils/types'
import LazyImg from '../lazy-img'

type WorkRankItemProps = {
  itemInfo: WorkRankItemInfo
  like: (id: string) => void
}

const WorkRankItem: FC<WorkRankItemProps> = ({ itemInfo, like }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)

  return (
    <div className='shrink-0 relative w-288px rd-1 bg-white overflow-hidden'>
      <div className='absolute top-0 left-0 w-288px h-288px z-99'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
          className='cursor-pointer hover:bg-white hover:opacity-16 absolute top-0 left-0 w-288px h-288px'
        />
        <div className='absolute top-10px left-10px w-10 h-10 rd-full bg-black opacity-32 flex items-center justify-center font-size-24px font-bold color-white'>
          <span>{itemInfo.range}</span>
        </div>
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
            onClick={() => like(itemInfo.id)}
          />
        )}
      </div>

      <div className='relative w-288px h-288px rd-1 flex items-center justify-center overflow-hidden'>
        <LazyImg src={itemInfo.cover} alt={itemInfo.name} />
      </div>

      <div className='relative p-10px flex flex-col gap-5px'>
        <Link
          to={`/work-detail/${itemInfo.id}`}
          className='w-full cursor-pointer font-size-14px color-#3d3d3d font-bold whitespace-nowrap overflow-hidden text-ellipsis inline-block'>
          <span>{itemInfo.name}</span>
        </Link>

        <div className='flex items-center gap-10px font-size-14px color-#858585'>
          <Link
            to={`/personal-center/${itemInfo.authorId}/works`}
            className='cursor-pointer w-6 h-6 rd-full overflow-hidden flex items-center justify-center'>
            <LazyImg src={itemInfo.authorAvatar} alt={itemInfo.authorName} />
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

export default WorkRankItem
