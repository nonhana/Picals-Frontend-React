import { FC, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '@/components/personal-center/header'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

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
  const navigate = useNavigate()
  const [current, setCurrent] = useState('works')

  const checkoutMenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    navigate(e.key)
    setCurrent(e.key)
  }

  return (
    <div className='relative w-100% flex flex-col items-center'>
      <Header />
      <Menu
        className='w-350'
        onClick={checkoutMenu}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      <div className='mb-5'>
        <Outlet />
      </div>
    </div>
  )
}

export default PersonalCenter
