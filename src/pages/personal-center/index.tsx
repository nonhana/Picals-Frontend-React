import { FC, useState, createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import { useOutletContext, Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import Header from '@/components/personal-center/header'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import {
  PictureOutlined,
  HeartOutlined,
  StarOutlined,
  UserOutlined,
  TeamOutlined,
  HistoryOutlined,
} from '@ant-design/icons'

const PersonalContext = createContext({ isMe: false, currentPath: '', userId: '' })

const items: MenuProps['items'] = [
  {
    label: '插画',
    key: 'works',
    icon: <PictureOutlined />,
  },
  {
    label: '最近喜欢',
    key: 'likes',
    icon: <HeartOutlined />,
  },
  {
    label: '收藏集',
    key: 'favorites',
    icon: <StarOutlined />,
  },
  {
    label: '关注',
    key: 'follow',
    icon: <UserOutlined />,
  },
  {
    label: '粉丝',
    key: 'fans',
    icon: <TeamOutlined />,
  },
  {
    label: '浏览记录',
    key: 'history',
    icon: <HistoryOutlined />,
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

  const [width, setWidth] = useState<number>(1245)
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  return (
    <PersonalContext.Provider value={{ isMe, currentPath, userId: userId! }}>
      <div className='relative w-full flex flex-col items-center'>
        <Header />
        <Menu
          className='w-full max-w-350'
          onClick={checkoutMenu}
          selectedKeys={[currentPath]}
          mode='horizontal'
          items={items}
        />
        <div
          style={{ width: `${width}px` }}
          className='relative max-w-350 mb-5 flex justify-center'>
          <Outlet />
        </div>
      </div>
    </PersonalContext.Provider>
  )
}

export { PersonalContext }
export default PersonalCenter
