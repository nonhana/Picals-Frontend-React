import { FC } from 'react'
import type { UserItemInfo } from '@/utils/types'
import UserWorkItem from './user-work-item'
import { Button } from 'antd'

type UserItemProps = UserItemInfo & {
  width: number
  follow: (id: string) => void
  likeWork: (userId: string, workId: string) => void
}

const UserItem: FC<UserItemProps> = ({
  id,
  username,
  intro,
  avatar,
  works,
  follow,
  likeWork,
  isFollowed,
  width,
}) => {
  return (
    <div className='relative p-5 flex gap-5 rd-1 bg-white'>
      <div className='shrink-0 w-20 h-20 rd-full overflow-hidden cursor-pointer'>
        <img className='w-full h-full object-cover' src={avatar} alt={username} />
      </div>

      <div className='flex flex-col gap-5'>
        <div className='font-size-14px font-bold color-#3d3d3d'>
          <span>{username}</span>
        </div>

        <div className='font-size-12px color-#6d757a w-70 break-words'>
          <span>{intro}</span>
        </div>

        {isFollowed ? (
          <Button
            className='w-25'
            shape='round'
            size='large'
            type='primary'
            onClick={() => follow(id)}>
            加关注
          </Button>
        ) : (
          <Button
            className='w-25'
            shape='round'
            size='large'
            type='default'
            onClick={() => follow(id)}>
            已关注
          </Button>
        )}
      </div>

      <div className='flex gap-5'>
        {works.slice(0, width === 1245 ? 4 : 3).map((work) => (
          <UserWorkItem key={work.id} itemInfo={work} like={likeWork} />
        ))}
      </div>
    </div>
  )
}

export default UserItem
