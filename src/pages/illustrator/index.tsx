import { FC } from 'react'
import type { IllustratorInfo } from '@/apis/illustrator/types'
import { Button } from 'antd'
import { PhotoView } from 'react-photo-view'
import HanaViewer from '@/components/common/hana-viewer'

const illustratorInfo: IllustratorInfo = {
  avatar: null,
  createdAt: '',
  id: '',
  intro: '',
  name: 'non_hana',
  updatedAt: '',
  workNum: 1000,
  homeUrl: 'https://www.pixiv.net/users/71393549',
}

const Illustrator: FC = () => {
  return (
    <div className='relative w-full min-h-screen bg-#f5f5f5 flex justify-center'>
      <div className='relative mt-30 mb-10 w-250 bg-white rd-6 flex flex-col items-center'>
        <div className='p-5 w-full flex justify-between items-center'>
          <div className='color-#3d3d3d font-size-18px font-bold'>
            <span>现收录作品：{illustratorInfo.workNum}件</span>
          </div>
          <div className='absolute top--20 left-1/2 transform -translate-x-1/2 flex flex-col gap-2.5 items-center color-#3d3d3d font-size-18px font-bold'>
            <div className='w-40 h-40 rd-full color-white b-5px b-solid overflow-hidden'>
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
            <Button shape='round' size='large'>
              查看画家信息
            </Button>
            <Button type='primary' shape='round' size='large'>
              开始浏览作品
            </Button>
          </div>
        </div>
        <div className='w-full mt-15'>
          <span>瀑布流作品布局，正在写ing</span>
        </div>
      </div>
    </div>
  )
}

export default Illustrator
