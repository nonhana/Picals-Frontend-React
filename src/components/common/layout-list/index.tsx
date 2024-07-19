import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { debounce } from 'lodash'
import { FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

type ScrollType =
  | 'label'
  | 'label-img'
  | 'work-normal'
  | 'work-rank'
  | 'work-detail'
  | 'work-little'

type LayoutListProps = {
  scrollType: ScrollType
  children: React.ReactNode
  initializing?: boolean
  setInitializing?: (status: boolean) => void
  className?: string
  gap?: number
  type?: string
  workId?: string
  setAtBottom?: (status: boolean) => void
}

const scrollMap: Map<ScrollType, number> = new Map([
  ['label', 400],
  ['label-img', 512],
  ['work-normal', 1020],
  ['work-rank', 924],
  ['work-detail', 640],
  ['work-little', 300],
])

const LayoutList: FC<LayoutListProps> = ({
  initializing,
  setInitializing,
  className,
  type,
  workId,
  scrollType,
  children,
  gap = 10,
  setAtBottom,
}) => {
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

  const handleScroll = () => {
    if (layoutRef.current && setAtBottom) {
      const { scrollLeft, scrollWidth, clientWidth } = layoutRef.current
      if (scrollLeft + clientWidth >= scrollWidth - 100) {
        setAtBottom(true)
      } else {
        setAtBottom(false)
      }
    }
  }

  useEffect(() => {
    if (!layoutRef.current) return
    const debouncedHandleScroll = debounce(handleScroll, 50)
    layoutRef.current.addEventListener('scroll', debouncedHandleScroll)
    return () => layoutRef.current?.removeEventListener('scroll', debouncedHandleScroll)
  }, [])

  useEffect(() => {
    if (!layoutRef.current) return
    if (type === 'work-detail') return
    layoutRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    })
  }, [children])

  useEffect(() => {
    if (setAtBottom) setAtBottom(false)
    if (!layoutRef.current) return
    if (type !== 'work-detail') return
    if (initializing) return

    const currentWorkItem = Array.from(layoutRef.current.children).find(
      (item) => item.getAttribute('data-id') === workId,
    )
    if (currentWorkItem) {
      const itemLeft = currentWorkItem.getBoundingClientRect().left
      const layoutRefLeft = layoutRef.current.getBoundingClientRect().left
      layoutRef.current.scrollBy({
        top: 0,
        left: itemLeft - layoutRefLeft,
        behavior: 'smooth',
      })
      return
    } else {
      if (setAtBottom && setInitializing) {
        setAtBottom(true)
        setInitializing(true)
      }
    }
  }, [workId, initializing])

  return (
    <div
      className={`relative not-show-scrollbar w-full ${className}`}
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
