import type { FC } from 'react'
import BgSlide from '@/components/login/bg-slide'
import LoginWindow from '@/components/login/login-window'
import { BrowserView } from 'react-device-detect'

const Login: FC = () => {
  return (
    <div className="size-screen from-#f5f5f5 to-#e6f9ff bg-gradient-to-br">
      <BrowserView>
        <BgSlide />
      </BrowserView>
      <LoginWindow />
    </div>
  )
}

export default Login
