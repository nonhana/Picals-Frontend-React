import LatestList from '@/components/explore/latest-list'
import UserList from '@/components/explore/user-list'
import WorkList from '@/components/explore/work-list'
import { PictureOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { useOutletContext, useNavigate, useParams } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: '推荐作品',
    key: 'recommend',
    icon: <PictureOutlined />,
  },
  {
    label: '最新发布',
    key: 'latest',
    icon: <ClockCircleOutlined />,
  },
  {
    label: '推荐用户',
    key: 'users',
    icon: <UserOutlined />,
  },
]

const Explore: FC = () => {
  const navigate = useNavigate()
  const { type } = useParams()

  const [width, setWidth] = useState<number>(1245)
  const exploreRef = useRef<HTMLDivElement>(null)
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  const checkoutMenu: MenuProps['onClick'] = (e) => {
    navigate(`/explore/${e.key}`)
  }

  return (
    <div ref={exploreRef} className='relative w-full my-30px select-none'>
      <div style={{ width: `${width}px` }} className='flex flex-col items-center mx-auto'>
        <Menu
          className='w-full'
          onClick={checkoutMenu}
          selectedKeys={[type!]}
          mode='horizontal'
          items={items}
        />
        {type === 'recommend' ? (
          <WorkList />
        ) : type === 'latest' ? (
          <LatestList />
        ) : type === 'users' ? (
          <UserList width={width} />
        ) : null}
      </div>
    </div>
  )
}

export default Explore
