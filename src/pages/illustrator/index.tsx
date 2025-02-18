import { getIllustratorDetailAPI } from '@/apis'
import type { IllustratorInfo } from '@/apis/illustrator/types'
import HanaViewer from '@/components/common/hana-viewer'
import InfoModal from '@/components/illustrator/info-modal'
import WaterfallFlow from '@/components/illustrator/waterfall-flow'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { PhotoView } from 'react-photo-view'
import { useParams, useNavigate } from 'react-router'

const Illustrator: FC = () => {
  const navigate = useNavigate()
  const { illustratorId } = useParams<{ illustratorId: string }>()

  const [infoModalVisible, setInfoModalVisible] = useState(false)
  const [illustratorInfo, setIllustratorInfo] = useState<IllustratorInfo>()

  const getIllustratorDetail = async () => {
    try {
      const { data } = await getIllustratorDetailAPI({ id: illustratorId! })
      setIllustratorInfo(data)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getIllustratorDetail()
  }, [illustratorId])

  const [startAppreciate, setStartAppreciate] = useState(false)

  return (
    <div className='relative w-full min-h-screen flex justify-center bg-gradient-to-b from-#e6f9ff to-#f5f5f5'>
      <div className='relative mt-30 mb-10 w-300 bg-white rd-6 flex flex-col items-center'>
        {illustratorInfo && (
          <div className='p-5 w-full flex justify-between items-center'>
            <Button
              icon={<ArrowLeftOutlined />}
              shape='round'
              size='large'
              onClick={() => navigate(-1)}>
              返回
            </Button>
            <div className='absolute top--20 left-1/2 transform -translate-x-1/2 flex flex-col gap-2.5 items-center color-shallowblack font-size-18px font-bold'>
              <div className='w-40 h-40 rd-full color-white b-5px b-solid overflow-hidden cursor-pointer'>
                <HanaViewer>
                  <PhotoView
                    src={
                      illustratorInfo.avatar ||
                      `https://fakeimg.pl/400x400?font=noto&text=${illustratorInfo.name}`
                    }>
                    <img
                      className='w-full h-full object-cover'
                      src={
                        illustratorInfo.avatar ||
                        `https://fakeimg.pl/400x400?font=noto&text=${illustratorInfo.name}`
                      }
                      alt={illustratorInfo.name}
                    />
                  </PhotoView>
                </HanaViewer>
              </div>
              <span>{illustratorInfo.name}</span>
            </div>
            <div className='flex gap-5'>
              <Button shape='round' size='large' onClick={() => setInfoModalVisible(true)}>
                查看画家信息
              </Button>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={() => setStartAppreciate(true)}>
                开始浏览作品
              </Button>
            </div>
          </div>
        )}
        <div className='w-full mt-15 flex justify-center'>
          <WaterfallFlow startAppreciate={startAppreciate} />
        </div>
      </div>

      {illustratorInfo && (
        <InfoModal
          visible={infoModalVisible}
          setVisible={setInfoModalVisible}
          info={illustratorInfo}
        />
      )}
    </div>
  )
}

export default Illustrator
