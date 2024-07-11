import { FC } from 'react'
import type { UserDetailInfo } from '@/utils/types'
import HanaModal from '../common/hana-modal'
import HanaViewer from '../common/hana-viewer'
import { PhotoView } from 'react-photo-view'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'

const genderMap = {
  0: '男性',
  1: '女性',
  2: '保密',
}

type InfoModalProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  info: UserDetailInfo
  follow: () => void
}

const InfoModal: FC<InfoModalProps> = ({ visible, setVisible, info, follow }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const { id } = useSelector((state: AppState) => state.user.userInfo)

  return (
    <HanaModal title='个人信息' visible={visible} setVisible={setVisible}>
      <>
        <div className='relative w-full h-63 bg-#f8f8f8 flex justify-center items-center font-size-18px font-bold color-#3d3d3d'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <HanaViewer>
              <div className='w-24 h-24 rd-full cursor-pointer overflow-hidden'>
                <PhotoView src={info.avatar}>
                  <img
                    className='object-cover w-full h-full'
                    src={info.littleAvatar}
                    alt={info.littleAvatar}
                  />
                </PhotoView>
              </div>
            </HanaViewer>
            <span>{info.username}</span>
            <span className='font-normal font-size-14px color-#858585'>{info.email}</span>
            {isLogin && id !== info.id && (
              <Button
                type={info.isFollowed ? 'default' : 'primary'}
                size='large'
                shape='round'
                onClick={follow}>
                {info.isFollowed ? '已关注' : '加关注'}
              </Button>
            )}
          </div>
        </div>
        <div className='p-5 flex flex-col gap-5 font-bold font-size-14px color-#3d3d3d'>
          <div className='flex gap-5 line-height-normal text-wrap'>
            <span className='shrink-0'>个人简介</span>
            <span>{info.intro}</span>
          </div>
          <div className='flex gap-5 line-height-normal text-wrap'>
            <span className='shrink-0'>个人性别</span>
            <span>{genderMap[info.gender]}</span>
          </div>
        </div>
      </>
    </HanaModal>
  )
}

export default InfoModal
