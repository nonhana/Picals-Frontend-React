import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const AuthRouter: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      message.info('您尚未登录，无法进入此页面哦~')
      navigate('/home')
    }
  }, [isLogin, navigate])

  if (isLogin) return <>{children}</>
  return null
}

export default AuthRouter
