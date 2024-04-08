import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { HEADER_DROPDOWN_LIST } from '@/utils/constants'
import { CSSTransition } from 'react-transition-group'

const UserDropdown: FC<{
  visible: boolean
  className?: string
  setVisible: (visible: boolean) => void
}> = ({ visible, className, setVisible }) => {
  const selectItem = (route: string) => {
    console.log(route)
  }

  const userInfo = useSelector((state: AppState) => state.user.userInfo)

  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-16 z-999'
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          className={`absolute flex flex-col w-50 rd-6px bg-white overflow-hidden z-1000 ${className}`}>
          <div className='absolute top-0 left-0 w-full h-12.5 bg-#f5f5f5' />
          <div className='m-t-25px flex flex-col items-start justify-between h-25 p-l-2.5 p-r-2.5 z-1'>
            <Link to={`/personal-center/${userInfo.id}`}>
              <div className='w-12.5 h-12.5 rd-full flex justify-center items-center overflow-hidden '>
                <img className='w-12.5' src={userInfo.avatar} alt='avatar' />
              </div>
            </Link>
            <div className='font-bold font-size-14px color-#3d3d3d'>
              <span>{userInfo.username}</span>
            </div>
            <div className='font-size-12px color-#6d757a'>
              <span>{userInfo.email}</span>
            </div>
          </div>
          <div className='p-2.5 w-30 flex justify-between'>
            <div className='h-9 flex flex-col justify-between items-start cursor-pointer'>
              <span className='font-size-14px color-#3d3d3d'>{userInfo.followNum}</span>
              <span className='font-size-12px color-#6d757a'>已关注</span>
            </div>
            <div className='h-9 flex flex-col justify-between items-start cursor-pointer'>
              <span className='font-size-14px color-#3d3d3d'>{userInfo.fanNum}</span>
              <span className='font-size-12px color-#6d757a'>粉丝</span>
            </div>
          </div>
          <ul className='m-0 p-0 list-none font-size-14px color-#3d3d3d'>
            {HEADER_DROPDOWN_LIST.map((item, index) => (
              <li
                className='px-2.5 py-3 cursor-pointer hover:bg-#f8f8f8 transition-duration-300'
                key={index}
                onClick={() => selectItem(item.route)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default UserDropdown
