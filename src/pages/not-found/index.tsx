import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import HanaCard from '@/components/common/hana-card'
import LazyImg from '@/components/common/lazy-img'
import notFound from '@/assets/imgs/404.png'
import { Button } from 'antd'

const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-gradient-to-b from-#e6f9ff to-#f5f5f5'>
      <HanaCard>
        <div className='w-250px h-250px rd-6 overflow-hidden'>
          <LazyImg src={notFound} alt='notFound' />
        </div>
        <span>请求路径不存在~的说~</span>
        <span>如果页面有误，请即使反馈</span>
        <Button className='w-50' shape='round' size='large' onClick={() => navigate('/home')}>
          返回首页
        </Button>
      </HanaCard>
    </div>
  )
}

export default NotFound
