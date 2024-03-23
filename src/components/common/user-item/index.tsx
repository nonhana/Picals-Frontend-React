import { FC } from 'react'
import type { UserInfo, WorkNormalItemInfo } from '@/utils/types'
import UserWorkItem from './user-work-item'
import { Button } from 'antd'

type UserItemProps = UserInfo & {
  works: WorkNormalItemInfo[]
  follow: (id: string) => void
}

const UserItem: FC<UserItemProps> = ({ id, username, intro, avatar, works, follow }) => {
  return (
    <div className='relative p-5 flex gap-5 rd-1 bg-white w-1236px'>
      {/* 用户头像 */}
      <div className='shrink-0 w-20 h-20 rd-full overflow-hidden cursor-pointer'>
        <img className='w-full h-full object-cover' src={avatar} alt={username} />
      </div>

      {/* 用户信息 */}
      <div className='flex flex-col gap-5'>
        <div className='font-size-14px font-bold color-#3d3d3d'>
          <span>{username}</span>
        </div>

        <div className='font-size-12px color-#6d757a w-70 break-words'>
          <span>{intro}</span>
        </div>

        <Button
          className='w-25'
          shape='round'
          size='large'
          type='primary'
          onClick={() => follow(id)}>
          加关注
        </Button>
      </div>

      {/* 用户插画列表 */}
      <div className='flex gap-5'>
        {works.map((work) => (
          <UserWorkItem
            key={work.id}
            itemInfo={work}
            like={(id) => {
              console.log('like', id)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default UserItem
