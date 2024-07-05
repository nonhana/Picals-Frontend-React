import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import uploadSuccessfully from '@/assets/imgs/upload-successfully.gif'
import LazyImg from '@/components/common/lazy-img'

const pageCenter = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'

const UploadSuccess: FC = () => {
  const navigate = useNavigate()

  const reload = () => {
    window.location.reload()
  }

  return (
    <div
      className={`${pageCenter} rd-6 bg-#fff w-200 h-107 p-5 flex flex-col items-center gap-5 font-size-18px font-bold color-#3d3d3d`}>
      <div className='w-250px h-250px rd-6 overflow-hidden'>
        <LazyImg src={uploadSuccessfully} alt='uploadSuccessfully' />
      </div>
      <span>上传成功，正在审核中~！</span>
      <span>上传成功后会展示在首页哦~</span>
      <span>感谢您对小站做出的贡献！！( &gt; w &lt; )</span>
      <div className='flex gap-5'>
        <Button
          className='w-50'
          shape='round'
          size='large'
          type='default'
          onClick={() => navigate('/home')}>
          返回首页
        </Button>
        <Button className='w-50' shape='round' size='large' type='primary' onClick={reload}>
          重新上传作品
        </Button>
      </div>
    </div>
  )
}

export default UploadSuccess
