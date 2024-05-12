import { FC, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import WorkList from '@/components/explore/work-list'
import UserList from '@/components/explore/user-list'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { PictureOutlined, UserOutlined } from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    label: '推荐作品',
    key: 'works',
    icon: <PictureOutlined />,
  },
  {
    label: '推荐用户',
    key: 'users',
    icon: <UserOutlined />,
  },
]

const Explore: FC = () => {
  const [width, setWidth] = useState<number>(1245)
  const exploreRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState('works')
  const currentWidth = useOutletContext<number>()

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  const checkoutMenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <div ref={exploreRef} className='relative w-100% my-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col items-center mx-auto'>
        <Menu
          className='w-100%'
          onClick={checkoutMenu}
          selectedKeys={[current]}
          mode='horizontal'
          items={items}
        />
        {current === 'works' ? <WorkList /> : <UserList width={width} />}
      </div>
    </div>
  )
}

export default Explore
