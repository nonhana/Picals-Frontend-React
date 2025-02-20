import LazyImg from '@/components/common/lazy-img'
import { AppState } from '@/store/types'
import type { UserItemInfo } from '@/utils/types'
import { Button } from 'antd'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

type UserInfoProps = {
  userInfo: UserItemInfo
  onFollow: (id: string) => void
}

const UserInfo: FC<UserInfoProps> = ({ userInfo, onFollow }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id } = useSelector((state: AppState) => state.user.userInfo)

  return (
    <div className='relative flex flex-col gap-5 p-5 rd-6 bg-white w-82.5'>
      <div className='flex gap-10px items-center font-bold text-sm color-neutral-900'>
        <Link
          to={`/personal-center/${userInfo.id}`}
          className='shrink-0 w-10 h-10 rd-full cursor-pointer overflow-hidden'>
          <LazyImg src={userInfo.avatar} alt={userInfo.username} />
        </Link>
        <Link className='color-neutral-900' to={`/personal-center/${userInfo.id}`}>
          {userInfo.username}
        </Link>
      </div>
      <div className='bg-neutral-100 p-10px rd-1 text-sm color-neutral-900 text-wrap line-height-normal'>
        <span>{userInfo.intro}</span>
      </div>
      {userInfo.id !== id && isLogin && (
        <Button
          shape='round'
          size='large'
          type={userInfo.isFollowing ? 'default' : 'primary'}
          onClick={() => onFollow(userInfo.id)}>
          {userInfo.isFollowing ? '取消关注' : '关注'}
        </Button>
      )}
    </div>
  )
}

export default UserInfo
