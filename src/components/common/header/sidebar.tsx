import { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HEADER_MENU_LIST, SIDEBAR_WHITE_LIST } from '@/utils/constants'
import { Icon } from '@iconify/react'
import logo from '@/assets/svgs/logo.svg'
import { CSSTransition } from 'react-transition-group'

const Sidebar: FC<{
  className?: string
  visible: boolean
  setVisible: (visible: boolean) => void
}> = ({ className, visible, setVisible }) => {
  const location = useLocation()
  const [maskTrigger, setMaskTrigger] = useState(false)

  useEffect(() => {
    setMaskTrigger(false)
    if (!SIDEBAR_WHITE_LIST.includes(location.pathname)) {
      const timer = setTimeout(() => {
        setMaskTrigger(true)
      }, 300)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [location.pathname])

  return (
    <>
      {!SIDEBAR_WHITE_LIST.includes(location.pathname) && maskTrigger && (
        <CSSTransition in={visible} timeout={300} classNames='opacity-gradient' unmountOnExit>
          <div
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 z-999'
            onClick={() => setVisible(false)}
          />
        </CSSTransition>
      )}

      <CSSTransition in={visible} timeout={300} classNames='left-to-right' unmountOnExit>
        <div
          className={`border-#858585 border-1px border-r-solid select-none fixed top-0 bottom-0 w-60 bg-white z-1000 ${className}`}>
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
              <Link key={item.route} to={item.route}>
                <li
                  className={`px-5 h-12 flex items-center gap-2.5 cursor-pointer hover:bg-#f5f5f5 transition-duration-300 ${location.pathname === item.route ? 'bg-#f5f5f5' : ''}`}>
                  <Icon color='#858585' width={20} icon={item.icon} />
                  <span className='font-size-14px color-#3d3d3d'>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default Sidebar
