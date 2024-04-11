import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/common/header'
import { SIDEBAR_WHITE_LIST } from './utils/constants'

const App: FC = () => {
  const location = useLocation()
  const [showSideBar, setShowSideBar] = useState(false)
  const [width, setWidth] = useState('100%')

  useEffect(() => {
    setWidth(
      showSideBar &&
        location.pathname !== '/login' &&
        SIDEBAR_WHITE_LIST.includes(location.pathname)
        ? 'calc(100% - 240px)'
        : '100%',
    )
  }, [showSideBar, location.pathname])

  return (
    <div className=''>
      {location.pathname !== '/login' && <Header changeSideBarStatus={setShowSideBar} />}
      <div style={{ width }} className='absolute right-0 flex transition-all duration-300'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
