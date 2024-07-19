import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import Header from './components/common/header'
import { useWinChange } from './hooks'
import type { AppState } from './store/types'
import { SIDEBAR_WHITE_LIST } from './utils/constants'

const App: FC = () => {
  const { uploadSuccess } = useSelector((state: AppState) => state.uploadForm)

  const location = useLocation()
  const [showSideBar, setShowSideBar] = useState(false)
  const [naturalSideBarVisible, setNaturalSideBarVisible] = useState(false) // 是否自然地触发侧边栏显示与否，而非点击按钮
  const [marginTrigger, setMarginTrigger] = useState(false) // 用来控制主窗口是否向右移动
  const appRef = useRef<HTMLDivElement | null>(null)
  const currentWidth = useWinChange(appRef)

  useEffect(() => {
    if (SIDEBAR_WHITE_LIST.test(location.pathname)) {
      if (naturalSideBarVisible) setMarginTrigger(showSideBar)
      else setMarginTrigger(false)
    } else {
      setMarginTrigger(
        showSideBar && location.pathname !== '/login' && SIDEBAR_WHITE_LIST.test(location.pathname),
      )
    }
  }, [showSideBar, location.pathname, currentWidth])

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/not-found' && !uploadSuccess && (
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
