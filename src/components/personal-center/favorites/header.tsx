import { FC } from 'react'
import type { FavoriteDetailInfo } from '@/utils/types'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

type HeaderProps = FavoriteDetailInfo

const Header: FC<HeaderProps> = ({ name, intro, creatorId, creatorName, cover, workNum }) => {
  return (
    <div className='relative w-954px p-5 flex justify-between border-b-solid border-1px border-color-#858585'>
      <div className='flex gap-5 items-center'>
        <div className='w-40 h-40 flex justify-center items-center'>
          <img
            className='w-full h-full object-cover'
            src={cover || `https://dummyimage.com/400x400&text=${name}`}
            alt={name}
          />
        </div>
        <div className='w-100 flex flex-col gap-10px font-size-14px color-#3d3d3d'>
          <span className='font-size-18px font-bold'>{name}</span>
          <span>
            创建者：
            <Link to={`/personal-center/${creatorId}`}>{creatorName}</Link>
          </span>
          <span>{workNum}个内容</span>
          <span>{intro}</span>
        </div>
      </div>
      <Button size='large' shape='round' type='primary'>
        开始浏览全部作品
      </Button>
    </div>
  )
}

export default Header
