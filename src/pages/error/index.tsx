import ErrorImg from '@/assets/imgs/500.png'
import HanaCard from '@/components/common/hana-card'
import LazyImg from '@/components/common/lazy-img'
import { Button } from 'antd'
import { FC } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

const Error: FC<FallbackProps> = ({ error }) => {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-gradient-to-b from-#e6f9ff to-#f5f5f5'>
      <HanaCard>
        <div className='w-250px h-250px rd-6 overflow-hidden'>
          <LazyImg src={ErrorImg} alt='ErrorImg' />
        </div>
        <span>页面发生错误：</span>
        <div className='bg-normal relative p-5 rd-1 font-size-m color-red'>
          <span>{error.message}</span>
        </div>
        <span>请向管理员汇报~！</span>
        <Button className='w-50' shape='round' size='large' onClick={() => navigate('/home')}>
          返回首页
        </Button>
      </HanaCard>
    </div>
  )
}

export default Error
