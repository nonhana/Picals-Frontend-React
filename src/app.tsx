import { FC, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from './store/types'
import Header from './components/common/header'
import { SIDEBAR_WHITE_LIST } from './utils/constants'
import { useWinChange } from './hooks'
import { message } from 'antd'

const App: FC = () => {
  const { isLogin } = useSelector((state: AppState) => state.user)

  const location = useLocation()
  const [showSideBar, setShowSideBar] = useState(false)
  const [naturalSideBarVisible, setNaturalSideBarVisible] = useState(false) // 是否自然地触发侧边栏显示与否，而非点击按钮
  const [marginTrigger, setMarginTrigger] = useState(false) // 用来控制主窗口是否向右移动
  const appRef = useRef<HTMLDivElement | null>(null)
  const currentWidth = useWinChange(appRef)

  useEffect(() => {
    if (!isLogin && location.pathname !== '/login') message.info('当前未登录，使用功能受限中~')
  }, [isLogin, location.pathname])

  useEffect(() => {
    if (SIDEBAR_WHITE_LIST.includes(location.pathname)) {
      if (naturalSideBarVisible) setMarginTrigger(showSideBar)
      else setMarginTrigger(false)
    } else {
      setMarginTrigger(
        showSideBar &&
          location.pathname !== '/login' &&
          SIDEBAR_WHITE_LIST.includes(location.pathname),
      )
    }
  }, [showSideBar, location.pathname, currentWidth])

  return (
    <>
      {location.pathname !== '/login' && (
        <Header
          width={currentWidth}
          changeSideBarStatus={setShowSideBar}
          setNaturalSideBarVisible={setNaturalSideBarVisible}
        />
      )}
      <div
        ref={appRef}
        className={`flex transition-all duration-300 ${marginTrigger ? 'ml-240px' : ''}`}>
        <Outlet context={currentWidth} />
      </div>
    </>
  )
}

export default App
