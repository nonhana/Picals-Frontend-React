import { FC, useState } from 'react'
import logo from '@/assets/svgs/logo.svg'
import { Icon } from '@iconify/react'
import { Input, Button } from 'antd'
import type { UserInfo } from '@/utils/types'
import { useSelector } from 'react-redux'
import UserDropdown from './user-dropdown'
import SearchDropdown from './search-dropdown'
import Sidebar from './sidebar'

const { Search } = Input

const Header: FC = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  const userInfo = useSelector((state: { user: { userInfo: UserInfo } }) => state.user.userInfo)

  return (
    <div
      className='select-none relative flex justify-between items-center w-full h-16 bg-white px-10
    '>
      <div className='flex items-center gap-2.5'>
        <Icon
          className='cursor-pointer'
          width={24}
          color='#858585'
          icon='ant-design:menu-outlined'
          onClick={() => setShowSidebar(true)}
        />
        <img className='h-10 cursor-pointer' src={logo} alt='picals-logo' />
      </div>

      <div className='absolute w-30% top-1/2 left-1/2 -translate-x-50% -translate-y-50%'>
        <Search
          size='large'
          placeholder='请输入你想搜索的内容呀~'
          allowClear
          onFocus={() => setShowSearchDropdown(true)}
        />
      </div>

      <div className='flex items-center gap-5'>
        <Button shape='round' type='default' size='large'>
          <span className='color-#6d757a'>投稿作品</span>
        </Button>
        <Icon width={24} color='#858585' icon='ant-design:bell-filled' />
        <div
          className='w-10 h-10 border-rd-20 flex items-center justify-center overflow-hidden cursor-pointer'
          onClick={() => setShowUserDropdown(!showUserDropdown)}>
          <img className='w-10' src={userInfo.avatar} alt='avatar' />
        </div>
      </div>

      <Sidebar className='top-0 left-0' visible={showSidebar} setVisible={setShowSidebar} />

      <SearchDropdown
        className='top-16 left-1/2 -translate-x-50%'
        visible={showSearchDropdown}
        setVisible={setShowSearchDropdown}
      />

      <UserDropdown
        className='top-16 right-10'
        visible={showUserDropdown}
        setVisible={setShowUserDropdown}
      />
    </div>
  )
}

export default Header
