import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { useParams } from 'react-router-dom'
import type { UserDetailInfo } from '@/utils/types'
import { getUserDetailAPI } from '@/apis'
import { Button } from 'antd'
import { EditModal } from './edit-modal'

const Header: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [userInfo, setUserInfo] = useState<UserDetailInfo>()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const { userInfo: localUserInfo } = useSelector((state: AppState) => state.user)

  // 获取用户的详细信息
  const getUserDetail = async () => {
    try {
      const { data } = await getUserDetailAPI({ id: userId! })
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  useEffect(() => {
    const fetchUserDetail = async () => {
      const data = await getUserDetail()
      if (data) {
        setUserInfo({
          id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          intro: data.signature,
          fanNum: data.fanCount,
          followNum: data.followCount,
          background_img: data.backgroundImg,
          gender: data.gender,
          isFollowed: data.isFollowed,
        })
      }
    }
    fetchUserDetail()
  }, [userId])

  return (
    <>
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
            {localUserInfo.id === userId && (
              <Button
                shape='round'
                size='large'
                type='primary'
                onClick={() => setEditModalVisible(true)}>
                编辑个人资料
              </Button>
            )}
            <Button shape='round' size='large' type='default'>
              查看个人资料
            </Button>
            {localUserInfo.id !== userId && (
              <Button
                shape='round'
                size='large'
                type={userInfo?.isFollowed ? 'default' : 'primary'}>
                {userInfo?.isFollowed ? '取消关注' : '加关注'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {userInfo?.id && (
        <EditModal
          visible={editModalVisible}
          setVisible={setEditModalVisible}
          id={userInfo?.id || ''}
        />
      )}
    </>
  )
}

export default Header
