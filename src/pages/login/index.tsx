import { FC } from 'react'
import LoginWindow from '@/components/login/login-window'
import BgSlide from '@/components/login/bg-slide'

const Login: FC = () => {
  return (
    <div className='h-screen'>
      <BgSlide />
      <LoginWindow />
    </div>
  )
}

export default Login
