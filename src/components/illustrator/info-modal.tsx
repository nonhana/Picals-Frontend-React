import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { IllustratorInfo } from '@/apis/illustrator/types'
import HanaModal from '../common/hana-modal'
import HanaViewer from '../common/hana-viewer'
import { PhotoView } from 'react-photo-view'

type InfoModalProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  info: IllustratorInfo
}

const InfoModal: FC<InfoModalProps> = ({ visible, setVisible, info }) => {
  const [illustratorAvatar, setIllustratorAvatar] = useState<string>('')

  useEffect(() => {
    setIllustratorAvatar(info.avatar || `https://fakeimg.pl/400x400?font=noto&text=${info.name}`)
  }, [info.avatar])

  return (
    <HanaModal title='插画家信息' visible={visible} setVisible={setVisible}>
      <>
        <div className='relative w-full h-63 bg-#f8f8f8 flex justify-center items-center font-size-18px font-bold color-#3d3d3d'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <HanaViewer>
              <div className='w-24 h-24 rd-full cursor-pointer overflow-hidden'>
                <PhotoView src={illustratorAvatar}>
                  <img
                    className='object-cover w-full h-full'
                    src={illustratorAvatar}
                    alt={info.name}
                  />
                </PhotoView>
              </div>
            </HanaViewer>
            <span>{info.name}</span>
          </div>
        </div>
        {/* <span>现收录作品数：{}</span> */}

        <div className='p-5 flex flex-col gap-5 font-bold font-size-14px color-#3d3d3d'>
          <div className='flex gap-5 line-height-normal text-wrap'>
            <span className='shrink-0 w-25'>现收录作品数</span>
            <span>{info.workNum}</span>
          </div>
          <div className='flex gap-5 line-height-normal text-wrap'>
            <span className='shrink-0 w-25'>个人简介</span>
            <span>{info.intro || '暂无关于该插画家的简介，待补充！'}</span>
          </div>
          <div className='flex gap-5 line-height-normal text-wrap'>
            <span className='shrink-0 w-25'>个人主页</span>
            <Link to={info.homeUrl} target='_blank' className='color-#1890ff'>
              {info.homeUrl}
            </Link>
          </div>
        </div>
      </>
    </HanaModal>
  )
}

export default InfoModal
