import { FC, useState } from 'react'
import logo from '@/assets/svgs/logo.svg'
import { Icon } from '@iconify/react'
import { Input, Button } from 'antd'
import type { UserInfo } from '@/utils/types'
import { useSelector } from 'react-redux'
import Dropdown from './dropdown'

const { Search } = Input

const Header: FC = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const userInfo = useSelector((state: { user: { userInfo: UserInfo } }) => state.user.userInfo)
  return (
    <div
      className='
        relative
        flex
        justify-between
        items-center
        w-full
        h-16
        bg-white
        p-l-10
        p-r-10
    '>
      <div className='flex items-center gap-2.5'>
        <Icon
          className='cursor-pointer'
          width={24}
          color='#858585'
          icon='ant-design:menu-outlined'
        />
        <img className='h-10 cursor-pointer' src={logo} alt='picals-logo' />
      </div>

      <div className='absolute w-30% top-1/2 left-1/2 -translate-x-50% -translate-y-50%'>
        <Search size='large' placeholder='请输入你想搜索的内容呀~' allowClear />
      </div>

      <div className='flex items-center gap-5'>
        <Button shape='round' type='default' size='large'>
          <span className='color-#6D757A'>投稿作品</span>
        </Button>
        <Icon width={24} color='#858585' icon='ant-design:bell-filled' />
        <div
          className='w-10 h-10 border-rd-20 flex items-center justify-center overflow-hidden cursor-pointer'
          onClick={() => setShowDropdown(!showDropdown)}>
          <img className='w-10' src={userInfo.avatar} alt='avatar' />
        </div>
      </div>

      <Dropdown className='top-16 right-10' visible={showDropdown} />
    </div>
  )
}

export default Header
