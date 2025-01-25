import BgSlide from '@/components/login/bg-slide'
import LoginWindow from '@/components/login/login-window'
import type { FC } from 'react'
import { BrowserView } from 'react-device-detect'

const Login: FC = () => {
  return (
    <div className='size-screen bg-gradient-to-br from-#f5f5f5 to-#e6f9ff'>
      <BrowserView>
        <BgSlide />
      </BrowserView>
      <LoginWindow />
    </div>
  )
}

export default Login
