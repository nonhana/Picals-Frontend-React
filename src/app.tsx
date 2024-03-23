import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/common/header'

const App: FC = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Outlet />
    </>
  )
}

export default App
