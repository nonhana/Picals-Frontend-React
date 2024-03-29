import { FC, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/common/header'

const App: FC = () => {
  const [showSideBar, setShowSideBar] = useState(false)

  const location = useLocation()

  return (
    <div className=''>
      {location.pathname !== '/login' && <Header changeSideBarStatus={setShowSideBar} />}
      <div
        style={{
          width: showSideBar && location.pathname !== '/login' ? 'calc(100% - 240px)' : '100%',
        }}
        className='absolute right-0 flex transition-all duration-300'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
