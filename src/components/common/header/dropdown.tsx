import { FC } from 'react'
import { useSelector } from 'react-redux'
import type { UserInfo } from '@/utils/types'
import { HEADER_DROPDOWN_LIST } from '@/utils/constants'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

const Dropdown: FC<{ visible: boolean; className?: string }> = ({ visible, className }) => {
  const selectItem = (route: string) => {
    console.log(route)
  }

  const userInfo = useSelector((state: { user: { userInfo: UserInfo } }) => state.user.userInfo)

  return (
    <CSSTransition
      in={visible}
      timeout={300} // 动画持续时间
      classNames='dropdown' // 应用于动画的类名前缀
      unmountOnExit // 动画完成后卸载组件
    >
      <div className={`absolute flex flex-col w-45 border-rd-6px bg-white ${className}`}>
        <div className='absolute top-0 left-0 w-full h-12.5 bg-#f8f8f8' />
        <div className='m-t-25px flex flex-col items-start justify-between h-25 p-l-2.5 p-r-2.5 z-1'>
          <div className='w-12.5 h-12.5 rd-full flex justify-center items-center overflow-hidden '>
            <img className='w-12.5' src={userInfo.avatar} alt='avatar' />
          </div>
          <div className='font-bold font-size-14px color-#3d3d3d'>
            <span>{userInfo.username}</span>
          </div>
          <div className='font-size-12px color-#6D757A'>
            <span>{userInfo.email}</span>
          </div>
        </div>
        <div className='p-2.5 w-30 flex justify-between'>
          <div className='h-9 flex flex-col justify-between items-start cursor-pointer'>
            <span className='font-size-14px color-#3d3d3d'>{userInfo.followNum}</span>
            <span className='font-size-12px color-#6D757A'>已关注</span>
          </div>
          <div className='h-9 flex flex-col justify-between items-start cursor-pointer'>
            <span className='font-size-14px color-#3d3d3d'>{userInfo.fanNum}</span>
            <span className='font-size-12px color-#6D757A'>粉丝</span>
          </div>
        </div>
        <ul className='m-0 p-0 list-none font-size-14px color-#3d3d3d'>
          {HEADER_DROPDOWN_LIST.map((item, index) => (
            <li
              className='p-2.5 cursor-pointer hover:bg-#f8f8f8 transition-duration-300'
              key={index}
              onClick={() => selectItem(item.route)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </CSSTransition>
  )
}

export default Dropdown
