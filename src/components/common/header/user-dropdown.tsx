import { reset } from '@/store/modules/favorites'
import { clear } from '@/store/modules/searchHistory'
import { logout } from '@/store/modules/user'
import type { AppState } from '@/store/types'
import { HEADER_DROPDOWN_LIST } from '@/utils/constants'
import { Modal, message } from 'antd'
import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import LazyImg from '../lazy-img'

const { confirm } = Modal

const UserDropdown: FC<{
  visible: boolean
  className?: string
  setVisible: (visible: boolean) => void
}> = ({ visible, className, setVisible }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: AppState) => state.user)

  const selectItem = (value: string) => {
    switch (value) {
      case 'works':
        navigate(`/personal-center/${userInfo.id}/works`)
        break
      case 'likes':
        navigate(`/personal-center/${userInfo.id}/likes`)
        break
      case 'favorites':
        navigate(`/personal-center/${userInfo.id}/favorites`)
        break
      case 'follow':
        navigate(`/personal-center/${userInfo.id}/follow`)
        break
      case 'fans':
        navigate(`/personal-center/${userInfo.id}/fans`)
        break
      case 'history':
        navigate(`/personal-center/${userInfo.id}/history`)
        break
      case 'profile':
        navigate(`/personal-center/${userInfo.id}/works?type=profile`)
        break
      default:
        break
    }
  }

  const handleLogout = () => {
    confirm({
      title: '确定要退出登录吗？',
      content: '退出登录后使用功能将受限哦~',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch(logout())
        dispatch(clear())
        dispatch(reset())
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
        message.success('退出登录成功')
      },
    })
  }

  const toggleBodyOverflow = (visible: boolean) => {
    document.documentElement.style.overflow = visible ? 'hidden scroll' : ''
    document.body.style.overflow = visible ? 'hidden' : ''
    document.body.style.maxHeight = visible ? '100vh' : ''
  }

  useEffect(() => {
    toggleBodyOverflow(visible)
  }, [visible])

  useEffect(() => {
    return () => toggleBodyOverflow(false)
  }, [])

  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 z-1999'
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className={`absolute flex flex-col w-50 rd-6px bg-white overflow-hidden z-2000 ${className}`}>
          <div className='absolute top-0 left-0 w-full h-12.5 bg-normal' />
          <div className='m-t-25px flex flex-col items-start justify-between h-25 p-l-2.5 p-r-2.5 z-1'>
            <Link to={`/personal-center/${userInfo.id}/works`}>
              <div className='w-12.5 h-12.5 rd-full flex justify-center items-center overflow-hidden '>
                <LazyImg src={userInfo.littleAvatar} alt='avatar' />
              </div>
            </Link>
            <div className='font-bold font-size-m color-shallowblack'>
              <span>{userInfo.username}</span>
            </div>
            <div className='font-size-s color-deepgrey'>
              <span>{userInfo.email}</span>
            </div>
          </div>
          <div className='p-2.5 w-30 flex justify-between'>
            <div
              className='h-9 flex flex-col justify-between items-start cursor-pointer'
              onClick={() => selectItem('follow')}>
              <span className='font-size-m color-shallowblack'>{userInfo.followNum}</span>
              <span className='font-size-s color-deepgrey'>已关注</span>
            </div>
            <div
              className='h-9 flex flex-col justify-between items-start cursor-pointer'
              onClick={() => selectItem('fans')}>
              <span className='font-size-m color-shallowblack'>{userInfo.fanNum}</span>
              <span className='font-size-s color-deepgrey'>粉丝</span>
            </div>
          </div>
          <ul className='m-0 p-0 list-none font-size-m color-shallowblack'>
            {HEADER_DROPDOWN_LIST.map((item, index) => (
              <li
                className='px-2.5 py-3 cursor-pointer hover:bg-light transition-duration-300'
                key={index}
                onClick={() => selectItem(item.value)}>
                {item.name}
              </li>
            ))}
            <li
              className='px-2.5 py-3 cursor-pointer hover:bg-light transition-duration-300'
              onClick={handleLogout}>
              退出登录
            </li>
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default UserDropdown
