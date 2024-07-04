import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import type { UserItemInfo } from '@/utils/types'
import UserWorkItem from './user-work-item'
import { Button } from 'antd'
import Empty from '../empty'
import LazyImg from '../lazy-img'

type UserItemProps = UserItemInfo & {
  width: number
  follow: (id: string) => void
  likeWork: (userId: string, workId: string) => void
}

const UserItem: FC<UserItemProps> = ({
  id,
  username,
  email,
  intro,
  avatar,
  works,
  follow,
  likeWork,
  isFollowing,
  width,
}) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id: localUserId } = useSelector((state: AppState) => state.user.userInfo)
  return (
    <div className='relative p-5 h-61 flex gap-5 rd-1 bg-white'>
      <Link
        to={`/personal-center/${id}/works`}
        className='shrink-0 w-20 h-20 rd-full overflow-hidden cursor-pointer'>
        <LazyImg src={avatar} alt={username} />
      </Link>

      <div className='flex flex-col gap-5'>
        <Link className='flex items-center gap-2.5' to={`/personal-center/${id}/works`}>
          <span className='font-size-14px font-bold color-#3d3d3d'>{username}</span>
          <span className='font-size-12px color-#6d757a'>{email}</span>
        </Link>

        <div className='font-size-12px color-#6d757a w-70 break-words'>
          <span>{intro}</span>
        </div>

        {isLogin &&
          (localUserId !== id ? (
            isFollowing ? (
              <Button
                className='w-25'
                shape='round'
                size='large'
                type='default'
                onClick={() => follow(id)}>
                已关注
              </Button>
            ) : (
              <Button
                className='w-25'
                shape='round'
                size='large'
                type='primary'
                onClick={() => follow(id)}>
                加关注
              </Button>
            )
          ) : (
            <Button className='w-25' shape='round' size='large' type='primary' disabled>
              你自己
            </Button>
          ))}
      </div>

      {!works || works.length === 0 ? (
        <Empty showImg={false} />
      ) : (
        <div className='flex gap-5'>
          {works.slice(0, width === 1245 ? 4 : 3).map((work) => (
            <UserWorkItem key={work.id} itemInfo={work} like={likeWork} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserItem
