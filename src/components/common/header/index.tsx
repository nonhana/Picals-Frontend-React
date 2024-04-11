import { FC, useEffect, useState } from 'react'
import { SIDEBAR_WHITE_LIST } from '@/utils/constants'
import logo from '@/assets/svgs/logo.svg'
import { Icon } from '@iconify/react'
import { Input, Button } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import type { AppState } from '@/store/types'
import UserDropdown from './user-dropdown'
import SearchDropdown from './search-dropdown'
import Sidebar from './sidebar'

const { Search } = Input

type HomeProps = {
  changeSideBarStatus: (status: boolean) => void
}

const Header: FC<HomeProps> = ({ changeSideBarStatus }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  useEffect(() => {
    changeSideBarStatus(showSidebar)
  }, [showSidebar])

  useEffect(() => {
    setShowSidebar(SIDEBAR_WHITE_LIST.includes(location.pathname))
  }, [location.pathname])

  const userInfo = useSelector((state: AppState) => state.user.userInfo)

  const handleSearch = (value: string) => {
    navigate({
      pathname: '/search-result',
      search: `?label=${value}&type=work&sortType=new`,
    })
    setShowSearchDropdown(false)
  }

  return (
    <>
      <div
        style={{
          zIndex: showSearchDropdown ? 2000 : 0,
        }}
        className='select-none relative flex justify-between items-center w-full h-16 bg-white px-10'>
        <Icon
          className='fixed cursor-pointer z-9'
          width={24}
          color='#858585'
          icon='ant-design:menu-outlined'
          onClick={() => setShowSidebar(true)}
        />
        <img
          onClick={() => {
            navigate('/home')
          }}
          className='ml-34px h-10 cursor-pointer'
          src={logo}
          alt='picals-logo'
        />

        <div className='absolute w-30% top-1/2 left-1/2 -translate-x-50% -translate-y-50%'>
          <Search
            size='large'
            placeholder='请输入你想搜索的内容呀~'
            allowClear
            onFocus={() => setShowSearchDropdown(true)}
            onSearch={(value) => handleSearch(value)}
          />
        </div>

        <div className='flex items-center gap-5'>
          <Link to='/upload'>
            <Button shape='round' type='default' size='large'>
              <span className='color-#6d757a'>投稿作品</span>
            </Button>
          </Link>
          <Icon width={24} color='#858585' icon='ant-design:bell-filled' />
          <div
            className='w-10 h-10 border-rd-20 flex items-center justify-center overflow-hidden cursor-pointer'
            onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <img className='w-10' src={userInfo.avatar} alt='avatar' />
          </div>
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
    </>
  )
}

export default Header
