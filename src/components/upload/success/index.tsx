import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import uploadSuccessfully from '@/assets/imgs/upload-successfully.gif'

const pageCenter = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'

type UploadSuccessProps = {
  workName: string
}

const UploadSuccess: FC<UploadSuccessProps> = ({ workName }) => {
  const navigate = useNavigate()

  return (
    <div
      className={`${pageCenter} rd-6 bg-#fff w-200 h-107 p-5 flex flex-col items-center gap-5 font-size-18px font-bold color-#3d3d3d`}>
      <div className='w-250px h-250px rd-6 overflow-hidden'>
        <img
          className='w-full h-full object-cover'
          src={uploadSuccessfully}
          alt='uploadSuccessfully'
        />
      </div>
      <span>您的作品：《{workName}》上传成功，正在审核中~！</span>
      <span>上传成功后会展示在首页哦~</span>
      <span>感谢您对小站做出的贡献！！( &gt; w &lt; )</span>
      <Button
        className='w-50'
        shape='round'
        size='large'
        type='primary'
        onClick={() => navigate('/home')}>
        返回首页
      </Button>
    </div>
  )
}

export default UploadSuccess
