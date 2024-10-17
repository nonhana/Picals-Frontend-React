import type { AppState } from '@/store/types'
import { MAX_WIDTH } from '@/utils'
import type { UserItemInfo } from '@/utils/types'
import { Button } from 'antd'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Empty from '../empty'
import LazyImg from '../lazy-img'
import WorkItem from '../work-item'

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
    <div className='relative p-5 h-65 flex gap-5 rd-1 bg-white'>
      <Link
        to={`/personal-center/${id}/works`}
        className='shrink-0 w-20 h-20 rd-full overflow-hidden cursor-pointer'>
        <LazyImg src={avatar} alt={username} />
      </Link>

      <div className='flex flex-col gap-5'>
        <Link className='flex items-center gap-2.5' to={`/personal-center/${id}/works`}>
          <span className='font-size-m font-bold color-shallowblack'>{username}</span>
          <span className='font-size-s color-deepgrey'>{email}</span>
        </Link>

        <div className='font-size-s color-deepgrey w-70 break-words'>
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
          {works.slice(0, width === MAX_WIDTH ? 4 : 3).map((work) => (
            <WorkItem type='user_work' key={work.id} itemInfo={work} like={likeWork} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserItem
