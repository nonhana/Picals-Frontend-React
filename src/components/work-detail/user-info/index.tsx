import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import type { UserItemInfo, WorkNormalItemInfo } from '@/utils/types'
import WorkLeastItem from '@/components/common/work-least-item'
import LayoutList from '@/components/common/layout-list'
import { Button } from 'antd'
import Empty from '@/components/common/empty'
import LazyImg from '@/components/common/lazy-img'

type UserInfoProps = {
  userInfo: UserItemInfo
  authorWorkList: WorkNormalItemInfo[]
  onFollow: (id: string) => void
}

const UserInfo: FC<UserInfoProps> = ({ userInfo, authorWorkList, onFollow }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id } = useSelector((state: AppState) => state.user.userInfo)

  return (
    <div className='relative flex flex-col gap-5 p-5 rd-6 bg-#fff w-82.5'>
      <div className='flex gap-10px items-center font-bold font-size-14px color-#3d3d3d'>
        <Link
          to={`/personal-center/${userInfo.id}`}
          className='shrink-0 w-10 h-10 rd-full cursor-pointer overflow-hidden'>
          <LazyImg src={userInfo.avatar} alt={userInfo.username} />
        </Link>
        <Link className='color-#3d3d3d' to={`/personal-center/${userInfo.id}`}>
          {userInfo.username}
        </Link>
      </div>
      <div className='font-bold font-size-14px color-#3d3d3d text-wrap line-height-normal'>
        <span>{userInfo.intro}</span>
      </div>
      {authorWorkList.length !== 0 ? (
        <LayoutList scrollType='work-little'>
          {authorWorkList.map((work) => (
            <WorkLeastItem key={work.id} itemInfo={work} />
          ))}
        </LayoutList>
      ) : (
        <Empty showImg={false} text='暂无其他作品' />
      )}
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
