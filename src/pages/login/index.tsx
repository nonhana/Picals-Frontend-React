import BgSlide from '@/components/login/bg-slide'
import LoginWindow from '@/components/login/login-window'
import { FC } from 'react'

const Login: FC = () => {
  return (
    <div className='h-screen'>
      <BgSlide />
      <LoginWindow />
    </div>
  )
}

export default Login
