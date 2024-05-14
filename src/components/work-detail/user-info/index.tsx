import { FC } from 'react'
import { Link } from 'react-router-dom'
import type { UserItemInfo } from '@/utils/types'
import WorkLeastItem from '@/components/common/work-least-item'
import LayoutList from '@/components/common/layout-list'
import { Button } from 'antd'

type UserInfoProps = {
  userInfo: UserItemInfo
  onFollow: (id: string) => void
}

const UserInfo: FC<UserInfoProps> = ({ userInfo, onFollow }) => {
  return (
    <div className='relative flex flex-col gap-5 p-5 rd-6 bg-#fff w-82.5'>
      <div className='flex gap-10px items-center font-bold font-size-14px color-#3d3d3d'>
        <Link
          to={`/personal-center/${userInfo.id}`}
          className='shrink-0 w-10 h-10 rd-full cursor-pointer overflow-hidden'>
          <img
            className='w-full h-full object-cover'
            src={userInfo.avatar}
            alt={userInfo.username}
          />
        </Link>
        <Link className='color-#3d3d3d' to={`/personal-center/${userInfo.id}`}>
          {userInfo.username}
        </Link>
      </div>
      <div className='font-bold font-size-14px color-#3d3d3d text-wrap line-height-normal'>
        <span>{userInfo.intro}</span>
      </div>
      <LayoutList scrollType='work-normal'>
        {userInfo.works.map((work) => (
          <WorkLeastItem key={work.id} itemInfo={work} />
        ))}
      </LayoutList>
      <Button
        shape='round'
        size='large'
        type={userInfo.isFollowed ? 'default' : 'primary'}
        onClick={() => onFollow(userInfo.id)}>
        {userInfo.isFollowed ? '取消关注' : '关注'}
      </Button>
    </div>
  )
}

export default UserInfo
