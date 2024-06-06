import { FC, useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { setUserInfo as setLocalUserInfo } from '@/store/modules/user'
import type { UserDetailInfo } from '@/utils/types'
import { getUserDetailAPI, userActionsAPI } from '@/apis'
import { Button } from 'antd'
import EditModal from './edit-modal'
import InfoModal from './info-modal'
import { PhotoView } from 'react-photo-view'
import HanaViewer from '../common/hana-viewer'
import { PersonalContext } from '@/pages/personal-center'

const Header: FC = () => {
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
      if (isMe) dispatch(setLocalUserInfo(data))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  // 关注或取消关注
  const handleFollow = async () => {
    try {
      await userActionsAPI({ id: userId! })
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
      <div className='relative w-100%'>
        <div className='relative w-100% h-120 overflow-hidden'>
          <img
            className='w-full h-full object-cover'
            src={userInfo.background_img}
            alt={userInfo.background_img}
          />
        </div>
        <div className='relative mx-auto w-350 p-5 flex justify-between'>
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
              <span className='font-size-18px font-bold'>{userInfo.username}</span>
              <div className='flex gap-10px'>
                <span>关注数：{userInfo.followNum}</span>
                <span>粉丝数：{userInfo.fanNum}</span>
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
            {!isMe && (
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
