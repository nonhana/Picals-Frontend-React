import { FC } from 'react'
import { HEADER_MENU_LIST } from '@/utils/constants'
import { Icon } from '@iconify/react'
import logo from '@/assets/svgs/logo.svg'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

const Sidebar: FC<{
  className?: string
  visible: boolean
  setVisible: (visible: boolean) => void
}> = ({ className, visible, setVisible }) => {
  return (
    <>
      {/* 全屏蒙版，实现点击后关闭窗口 */}
      <CSSTransition in={visible} timeout={300} classNames='dropdown-mask' unmountOnExit>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-16 z-98'
          onClick={() => setVisible(false)}
        />
      </CSSTransition>

      <CSSTransition in={visible} timeout={300} classNames='dropdown-mask' unmountOnExit>
        <div className={`absolute w-56 h-screen bg-white z-99 ${className}`}>
          <div className='px-10 h-16 flex items-center gap-2.5'>
            <Icon
              className='cursor-pointer'
              width={24}
              color='#858585'
              icon='ant-design:menu-outlined'
            />
            <img className='h-10 cursor-pointer' src={logo} alt='picals-logo' />
          </div>

          <ul className='list-none m-0 p-0'>
            {HEADER_MENU_LIST.map((item) => (
              <li
                className='px-5 h-10 flex items-center gap-2.5 cursor-pointer hover:bg-#f5f5f5 transition-duration-300'
                key={item.route}>
                <Icon color='#858585' width={20} icon={item.icon} />
                {/* <Link to={item.route}>{item.name}</Link> */}
                <span className='font-size-14px color-#3d3d3d'>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default Sidebar
