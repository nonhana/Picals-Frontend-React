import logo from '@/assets/svgs/logo.svg'
import type { AppState } from '@/store/types'
import {
  HEADER_MENU_LIST,
  HEADER_MENU_LIST_VISITOR,
  SIDEBAR_WHITE_LIST,
  TRIGGER_MIN_WIDTH,
  TRIGGER_MAX_WIDTH,
} from '@/utils/constants'
import { Icon } from '@iconify/react'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import AnimatedDiv from '@/components/motion/animated-div'

type SidebarProps = {
  width: number
  className?: string
  visible: boolean
  setVisible: (visible: boolean) => void
}

const Sidebar: FC<SidebarProps> = ({ width, className, visible, setVisible }) => {
  const { isLogin } = useSelector((state: AppState) => state.user)

  const location = useLocation()
  const [maskTrigger, setMaskTrigger] = useState(true)

  useEffect(() => setMaskTrigger(true), [location.pathname])

  useEffect(() => {
    if (!SIDEBAR_WHITE_LIST.test(location.pathname)) return
    if (width < TRIGGER_MIN_WIDTH) setMaskTrigger(true)
    if (width > TRIGGER_MAX_WIDTH) setMaskTrigger(false)
  }, [width, location.pathname])

  return (
    <AnimatePresence>
      {maskTrigger && visible && (
        <AnimatedDiv
          type='opacity-gradient'
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-32 z-999'
          onClick={() => setVisible(false)}
        />
      )}

      {visible && (
        <AnimatedDiv
          type='left-to-right'
          className={`rounded-r-6 shadow-2xl select-none fixed top-0 bottom-0 w-60 bg-white z-1000 ${className}`}>
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
            {(isLogin ? HEADER_MENU_LIST : HEADER_MENU_LIST_VISITOR).map((item) => (
              <Link key={item.route} to={item.route}>
                <li
                  className={`px-5 h-12 flex items-center gap-2.5 cursor-pointer hover:bg-normal transition-duration-300 ${location.pathname.includes(item.route) ? 'bg-normal' : ''}`}>
                  <Icon color='#858585' width={20} icon={item.icon} />
                  <span className='font-size-m color-shallowblack'>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </AnimatedDiv>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
