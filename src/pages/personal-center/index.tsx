import Header from '@/components/personal-center/header'
import { AppState } from '@/store/types'
import {
  PictureOutlined,
  HeartOutlined,
  StarOutlined,
  UserOutlined,
  TeamOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { FC, useState, createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'

const PersonalContext = createContext({ isMe: false, currentPath: '', userId: '', width: 0 })

const PersonalCenter: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPath, setCurrentPath] = useState('works')
  const { userId } = useParams()

  const { id: localUserId } = useSelector((state: AppState) => state.user.userInfo)
  const isMe = userId === localUserId

  const [menuItems, setMenuItems] = useState([
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
  ])

  useEffect(() => {
    if (isMe) {
      setMenuItems((prev) => [
        ...prev,
        {
          label: '浏览记录',
          key: 'history',
          icon: <HistoryOutlined />,
        },
      ])
    } else {
      setMenuItems((prev) => prev.filter((item) => item.key !== 'history'))
    }
  }, [isMe])

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
    <PersonalContext.Provider value={{ isMe, currentPath, userId: userId!, width }}>
      <div className='relative w-full flex flex-col items-center'>
        <Header />
        <Menu
          className='w-full max-w-350'
          onClick={checkoutMenu}
          selectedKeys={[currentPath]}
          mode='horizontal'
          items={menuItems}
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
