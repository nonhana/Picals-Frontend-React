import LazyImg from '@/components/common/lazy-img'
import type { FavoriteDetailInfo } from '@/utils/types'
import { Button } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router'

type HeaderProps = FavoriteDetailInfo & {
  setStartAppreciate: (status: boolean) => void
}

const Header: FC<HeaderProps> = ({
  name,
  intro,
  creatorId,
  creatorName,
  cover,
  workNum,
  setStartAppreciate,
}) => {
  return (
    <div className='relative p-5 flex justify-between b-b-solid b-1px color-deepgrey'>
      <div className='flex gap-5 items-center'>
        <div className='w-40 h-40 flex justify-center items-center'>
          <LazyImg
            className='rd-1'
            src={cover || `https://fakeimg.pl/400x400?font=noto&text=${name}`}
            alt={name}
          />
        </div>
        <div className='w-100 flex flex-col gap-10px font-size-m color-shallowblack'>
          <span className='font-size-18px font-bold'>{name}</span>
          <span>
            创建者：
            <Link to={`/personal-center/${creatorId}`}>{creatorName}</Link>
          </span>
          <span>{workNum}个内容</span>
          <span>{intro}</span>
        </div>
      </div>
      <Button
        size='large'
        shape='round'
        type='primary'
        onClick={() => setStartAppreciate(true)}
        disabled={!workNum}>
        开始浏览全部作品
      </Button>
    </div>
  )
}

export default Header
