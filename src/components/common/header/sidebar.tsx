import { FC } from 'react'
import { HEADER_MENU_LIST } from '@/utils/constants'
import { Icon } from '@iconify/react'
import logo from '@/assets/svgs/logo.svg'
import { CSSTransition } from 'react-transition-group'

const Sidebar: FC<{
  className?: string
  visible: boolean
  setVisible: (visible: boolean) => void
}> = ({ className, visible, setVisible }) => {
  return (
    <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
      <div className={`select-none absolute w-56 h-screen bg-white z-99 ${className}`}>
        <div className='px-10 h-16 flex items-center gap-2.5'>
          <Icon
            className='cursor-pointer'
            width={24}
            color='#858585'
            icon='ant-design:menu-outlined'
            onClick={() => setVisible(false)}
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
  )
}

export default Sidebar
