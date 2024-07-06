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
import { CSSTransition } from 'react-transition-group'
import ImgLoadingSkeleton from '@/components/skeleton/img-loading'

type UserInfoProps = {
  workId: string
  userInfo: UserItemInfo
  authorWorkList: {
    page: number
    list: WorkNormalItemInfo[]
  }[]
  setAuthorWorkListEnd: (status: boolean) => void
  isFinal: boolean
  onFollow: (id: string) => void
}

const UserInfo: FC<UserInfoProps> = ({
  workId,
  userInfo,
  authorWorkList,
  onFollow,
  setAuthorWorkListEnd,
  isFinal,
}) => {
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
        <LayoutList
          workId={workId}
          type='work-detail'
          scrollType='work-little'
          setAtBottom={setAuthorWorkListEnd}>
          {authorWorkList.map((everyPage, index) => (
            <CSSTransition
              key={`${everyPage}-${index}`}
              in={everyPage.list.length !== 0}
              timeout={300}
              classNames='opacity-gradient'
              unmountOnExit>
              <>
                {everyPage.list.map((work) => (
                  <WorkLeastItem key={work.id} data-id={work.id} itemInfo={work} />
                ))}
              </>
            </CSSTransition>
          ))}
          {!isFinal && <ImgLoadingSkeleton className='shrink-0 w-90px h-90px rd-1' />}
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
