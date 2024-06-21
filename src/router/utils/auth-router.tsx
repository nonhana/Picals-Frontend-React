import { FC } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { Navigate } from 'react-router-dom'
import { message } from 'antd'

const AuthRouter: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)
  if (isLogin) return <>{children}</>
  message.info('您尚未登录，无法进入此页面哦~')
  return <Navigate to='/home' />
}

export default AuthRouter
