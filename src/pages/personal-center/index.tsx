import { FC, useState, createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import Header from '@/components/personal-center/header'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

const PersonalContext = createContext({ isMe: false, currentPath: '', userId: '' })

const items: MenuProps['items'] = [
  {
    label: '插画',
    key: 'works',
  },
  {
    label: '最近喜欢',
    key: 'likes',
  },
  {
    label: '收藏集',
    key: 'favorites',
  },
]

const PersonalCenter: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPath, setCurrentPath] = useState('works')
  const { userId } = useParams()

  const { id: localUserId } = useSelector((state: AppState) => state.user.userInfo)
  const isMe = userId === localUserId

  const checkoutMenu: MenuProps['onClick'] = (e) => {
    setCurrentPath(e.key)
    navigate(e.key)
  }

  useEffect(() => {
    setCurrentPath(location.pathname.split('/')[3])
  }, [location.pathname])

  return (
    <PersonalContext.Provider value={{ isMe, currentPath, userId: userId! }}>
      <div className='relative w-100% flex flex-col items-center'>
        <Header />
        <Menu
          className='w-350'
          onClick={checkoutMenu}
          selectedKeys={[currentPath]}
          mode='horizontal'
          items={items}
        />
        <div className='mb-5'>
          <Outlet />
        </div>
      </div>
    </PersonalContext.Provider>
  )
}

export { PersonalContext }
export default PersonalCenter
