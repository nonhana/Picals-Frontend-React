import { FC, useRef, useState } from 'react'
import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { CSSTransition } from 'react-transition-group'

type LayoutListProps = {
  className?: string
  gap?: number
  scrollType: 'label' | 'label-img' | 'work-normal' | 'work-rank'
  children: React.ReactNode
}

const scrollMap: Map<'label' | 'label-img' | 'work-normal' | 'work-rank', number> = new Map([
  ['label', 400],
  ['label-img', 512],
  ['work-normal', 1020],
  ['work-rank', 924],
])

const LayoutList: FC<LayoutListProps> = ({ className, scrollType, children, gap = 10 }) => {
  const [showButtons, setShowButtons] = useState(false)
  const layoutRef = useRef<HTMLDivElement>(null)

  const scrollX = (direction: 'left' | 'right') => {
    if (layoutRef.current) {
      layoutRef.current.scrollBy({
        top: 0,
        left: direction === 'left' ? scrollMap.get(scrollType)! : -scrollMap.get(scrollType)!,
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
        <div className='z-999 absolute top-1/2 -translate-y-1/2 left-0'>
          <GreyButton onClick={() => scrollX('right')}>
            <Icon color='#fff' icon='ant-design:caret-left-filled' />
          </GreyButton>
        </div>
      </CSSTransition>
      <div
        ref={layoutRef}
        style={{
          gap: `${gap}px`,
        }}
        className='relative w-full flex flex-nowrap overflow-x-auto overflow-y-hidden transition-duration-300'>
        {children}
      </div>
      <CSSTransition in={showButtons} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div className='z-999 absolute top-1/2 -translate-y-1/2 right-0'>
          <GreyButton onClick={() => scrollX('left')}>
            <Icon color='#fff' icon='ant-design:caret-right-filled' />
          </GreyButton>
        </div>
      </CSSTransition>
    </div>
  )
}

export default LayoutList
