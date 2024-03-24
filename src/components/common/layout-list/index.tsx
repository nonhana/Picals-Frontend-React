import { FC, useRef, useState } from 'react'
import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { CSSTransition } from 'react-transition-group'

type LayoutListProps = {
  className?: string
  scrollAmount: number
  children: React.ReactNode
}

const LayoutList: FC<LayoutListProps> = ({ className, scrollAmount, children }) => {
  const [showButtons, setShowButtons] = useState(false)
  const layoutRef = useRef<HTMLDivElement>(null)

  const scrollX = (direction: 'left' | 'right') => {
    if (layoutRef.current) {
      layoutRef.current.scrollBy({
        top: 0,
        left: direction === 'left' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className={`relative not-show-scrollbar w-100% ${className}`}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}>
      <CSSTransition in={showButtons} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <GreyButton
          className='z-999 absolute top-1/2 -translate-y-1/2 left-10px'
          onClick={() => scrollX('right')}>
          <Icon color='#fff' icon='ant-design:caret-left-filled' />
        </GreyButton>
      </CSSTransition>
      <div
        ref={layoutRef}
        className='relative w-full flex flex-nowrap p-10px gap-10px overflow-x-auto overflow-y-hidden transition-duration-300'>
        {children}
      </div>
      <CSSTransition in={showButtons} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <GreyButton
          className='z-999 absolute top-1/2 -translate-y-1/2 right-10px'
          onClick={() => scrollX('left')}>
          <Icon color='#fff' icon='ant-design:caret-right-filled' />
        </GreyButton>
      </CSSTransition>
    </div>
  )
}

export default LayoutList
