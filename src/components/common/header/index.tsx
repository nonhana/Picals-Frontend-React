import logo from '@/assets/svgs/logo.svg'
import type { AppState } from '@/store/types'
import { SIDEBAR_WHITE_LIST, TRIGGER_MIN_WIDTH, TRIGGER_MAX_WIDTH } from '@/utils/constants'
import { Icon } from '@iconify/react'
import { Input, Button, message } from 'antd'
import type { InputRef } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router'

import SearchDropdown from './search-dropdown'
import Sidebar from './sidebar'
import UserDropdown from './user-dropdown'
import LazyImg from '../lazy-img'

const { Search } = Input

type HeaderProps = {
  width: number
  changeSideBarStatus: (status: boolean) => void
  setNaturalSideBarVisible: (status: boolean) => void
}

const Header: FC<HeaderProps> = ({ width, changeSideBarStatus, setNaturalSideBarVisible }) => {
  const searchParams = useSearchParams()[0]
  const searchLabel = searchParams.get('label')
  const location = useLocation()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  useEffect(() => changeSideBarStatus(showSidebar), [showSidebar])

  // 当路径变化时，隐藏所有工具栏
  useEffect(() => {
    setShowSidebar(false)
    setShowSearchDropdown(false)
    setShowUserDropdown(false)
  }, [location])

  useEffect(() => {
    if (!SIDEBAR_WHITE_LIST.test(location.pathname)) return
    if (width < TRIGGER_MIN_WIDTH) {
      setShowSidebar(false)
      setNaturalSideBarVisible(false)
    }
    if (width > TRIGGER_MAX_WIDTH) {
      setShowSidebar(true)
      setNaturalSideBarVisible(true)
    }
  }, [width, location.pathname])

  const { userInfo, isLogin } = useSelector((state: AppState) => state.user)

  const searchRef = useRef<InputRef>(null)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setKeyword(searchParams.get('label') || '')
  }, [searchLabel])

  const handleSearch = (value: string) => {
    value = value.trim()
    if (!value) {
      message.warning('请输入有效搜索内容~')
      return
    }
    navigate({
      pathname: '/search-result',
      search: `?label=${value}&type=work&sortType=new`,
    })
    setShowSearchDropdown(false)
    searchRef.current?.input?.blur()
  }

  const toUpload = () => {
    if (location.pathname === '/upload') return
    navigate('/upload')
  }

  return (
    <div className='relative w-full'>
      <Icon
        className='fixed cursor-pointer z-1 left-10 h-16'
        width={24}
        color='#858585'
        icon='ant-design:menu-outlined'
        onClick={() => setShowSidebar(true)}
      />

      <div
        style={{
          zIndex: showSearchDropdown ? 2000 : 0,
        }}
        className='select-none relative flex justify-between items-center w-full h-16 bg-white px-10'>
        <img
          onClick={() => {
            navigate('/home')
          }}
          className='ml-34px h-10 cursor-pointer'
          src={logo}
          alt='picals-logo'
        />

        <div className='absolute w-30% top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Search
            ref={searchRef}
            size='large'
            placeholder='请输入你想搜索的内容呀~'
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setShowSearchDropdown(true)}
            onSearch={(value) => handleSearch(value)}
          />
        </div>

        <div className='flex items-center gap-5'>
          <Link to='https://github.com/nonhana/Picals-Frontend-React' target='_blank'>
            <Icon width={32} color='#858585' icon='ant-design:github-filled' />
          </Link>
          {isLogin && (
            <Button shape='round' type='default' size='large' onClick={toUpload}>
              <span className='color-deepgrey'>转载/投稿作品</span>
            </Button>
          )}
          {isLogin ? (
            <div
              className='w-10 h-10 rd-20 flex items-center justify-center overflow-hidden cursor-pointer'
              onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <LazyImg src={userInfo.littleAvatar} alt='avatar' />
            </div>
          ) : (
            <Link
              to='/login'
              className='w-10 h-10 rounded-full flex items-center justify-center cursor-pointer color-white font-size-m bg-normalgrey'>
              <span>登录</span>
            </Link>
          )}
        </div>
      </div>

      <Sidebar
        className='top-0 left-0'
        width={width}
        visible={showSidebar}
        setVisible={setShowSidebar}
      />

      <SearchDropdown
        className='top-16 left-1/2 -translate-x-1/2'
        visible={showSearchDropdown}
        setVisible={setShowSearchDropdown}
        setKeyword={setKeyword}
      />

      {isLogin && (
        <UserDropdown
          className='top-16 right-10'
          visible={showUserDropdown}
          setVisible={setShowUserDropdown}
        />
      )}
    </div>
  )
}

export default Header
