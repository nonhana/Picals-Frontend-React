import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { useParams } from 'react-router-dom'
import type { UserDetailInfo } from '@/utils/types'
import { userDetailInfo } from '@/test/data'
import { Button } from 'antd'

const Header: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [userInfo, setUserInfo] = useState<UserDetailInfo>()
  const localUserInfo = useSelector((state: AppState) => state.user.userInfo)

  useEffect(() => {
    setUserInfo(userDetailInfo)
  }, [userId])

  return (
    <div className='relative w-100%'>
      <div className='relative w-100% h-120 overflow-hidden'>
        <img
          className='w-full h-full object-cover'
          src={userInfo?.background_img}
          alt={userInfo?.background_img}
        />
      </div>
      <div className='relative mx-auto w-350 p-5 flex justify-between'>
        <div className='flex gap-5'>
          <div className='border-solid border-2px border-#fff mt--17 w-24 h-24 rd-full overflow-hidden cursor-pointer z-1'>
            <img
              className='w-full h-full object-cover'
              src={userInfo?.avatar}
              alt={userInfo?.avatar}
            />
          </div>
          <div className='w-150 flex flex-col gap-10px font-size-14px color-#3d3d3d text-wrap'>
            <span className='font-size-18px font-bold'>{userInfo?.username}</span>
            <div className='flex gap-10px'>
              <span>关注数：{userInfo?.followNum}</span>
              <span>粉丝数：{userInfo?.fanNum}</span>
            </div>
            <span>{userInfo?.intro}</span>
          </div>
        </div>
        <div className='flex gap-5'>
          <Button shape='round' size='large' type='primary'>
            查看个人资料
          </Button>
          {localUserInfo.id !== userId && (
            <Button shape='round' size='large' type={userInfo?.isFollowed ? 'default' : 'primary'}>
              {userInfo?.isFollowed ? '取消关注' : '加关注'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
