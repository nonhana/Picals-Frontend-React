import { FC, useEffect, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { AppState } from '@/store/types'
import {
  decreaseFollowNum,
  increaseFollowNum,
  setUserInfo as setLocalUserInfo,
} from '@/store/modules/user'
import type { UserDetailInfo } from '@/utils/types'
import { getUserDetailAPI, userActionsAPI } from '@/apis'
import { Button } from 'antd'
import EditModal from './edit-modal'
import InfoModal from './info-modal'
import { PhotoView } from 'react-photo-view'
import HanaViewer from '../common/hana-viewer'
import { PersonalContext } from '@/pages/personal-center'
import { Icon } from '@iconify/react'

const Header: FC = () => {
  const navigate = useNavigate()
  const type = useSearchParams()[0].get('type')

  const { isLogin } = useSelector((state: AppState) => state.user)
  const { isMe, userId } = useContext(PersonalContext)

  const [userInfo, setUserInfo] = useState<UserDetailInfo>({
    id: '',
    username: '',
    email: '',
    avatar: '',
    intro: '',
    fanNum: 0,
    followNum: 0,
    background_img: '',
    gender: 2,
    isFollowed: false,
  })
  const [editModalVisible, setEditModalVisible] = useState(false)

  useEffect(() => {
    if (type && type === 'profile') {
      setTimeout(() => {
        setEditModalVisible(true)
      }, 300)
    }
  }, [type])

  const [infoModalVisible, setInfoModalVisible] = useState(false)

  const dispatch = useDispatch()

  // 获取用户的详细信息
  const getUserDetail = async () => {
    try {
      const { data } = await getUserDetailAPI({ id: userId! })
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
      // 如果当前页面为用户本身的主页，每次进入页面都要更新用户信息
      if (isMe)
        dispatch(
          setLocalUserInfo({
            id: data.id,
            username: data.username,
            avatar: data.avatar,
            intro: data.signature,
            email: data.email,
            fanNum: data.fanCount,
            followNum: data.followCount,
          }),
        )
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  // 关注或取消关注
  const handleFollow = async () => {
    try {
      await userActionsAPI({ id: userId! })
      if (!userInfo.isFollowed) {
        dispatch(increaseFollowNum())
      } else {
        dispatch(decreaseFollowNum())
      }
      setUserInfo((prev) => ({ ...prev, isFollowed: !prev.isFollowed }))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getUserDetail()
  }, [userId])

  return (
    <>
      <div className='relative w-full'>
        {userInfo.background_img ? (
          <div className='relative w-full h-130 overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={userInfo.background_img}
              alt={userInfo.background_img}
            />
          </div>
        ) : (
          <div className='relative w-full h-80'>
            <div
              className='bg-#f8f8f8 h-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-#f0f0f0'
              onClick={() => setEditModalVisible(true)}>
              <div className='flex flex-col items-center color-#6d757a font-size-14px font-bold'>
                <Icon color='#858585' width='48px' icon='ant-design:edit-filled' />
                <span>上传背景图</span>
              </div>
            </div>
          </div>
        )}

        <div className='relative mx-auto w-full max-w-350 p-5 flex justify-between'>
          <div className='flex gap-5'>
            <div className='border-solid border-2px border-#fff mt--17 w-24 h-24 rd-full overflow-hidden cursor-pointer z-1'>
              <HanaViewer>
                <PhotoView src={userInfo.avatar}>
                  <img
                    className='w-full h-full object-cover'
                    src={userInfo.avatar}
                    alt={userInfo.avatar}
                  />
                </PhotoView>
              </HanaViewer>
            </div>
            <div className='w-150 flex flex-col gap-10px font-size-14px color-#3d3d3d text-wrap'>
              <div className='flex items-center gap-10px'>
                <span className='font-size-18px font-bold'>{userInfo.username}</span>
                <span className='color-#6d757a'>{userInfo.email}</span>
              </div>
              <div className='flex gap-10px'>
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    navigate(`/personal-center/${userId}/follow`)
                  }}>
                  关注数：{userInfo.followNum}
                </span>
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    navigate(`/personal-center/${userId}/fans`)
                  }}>
                  粉丝数：{userInfo.fanNum}
                </span>
              </div>
              <span>{userInfo.intro}</span>
            </div>
          </div>
          <div className='flex gap-5'>
            {isMe && (
              <Button
                shape='round'
                size='large'
                type='primary'
                onClick={() => setEditModalVisible(true)}>
                编辑个人资料
              </Button>
            )}
            <Button
              shape='round'
              size='large'
              type='default'
              onClick={() => setInfoModalVisible(true)}>
              查看个人资料
            </Button>
            {!isMe && isLogin && (
              <Button
                shape='round'
                size='large'
                type={userInfo.isFollowed ? 'default' : 'primary'}
                onClick={handleFollow}>
                {userInfo.isFollowed ? '取消关注' : '加关注'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <EditModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        onConfirm={getUserDetail}
        info={userInfo}
      />

      <InfoModal
        visible={infoModalVisible}
        setVisible={setInfoModalVisible}
        info={userInfo}
        follow={handleFollow}
      />
    </>
  )
}

export default Header
