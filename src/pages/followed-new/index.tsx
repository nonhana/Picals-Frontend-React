import { FC, useEffect, useRef, useState } from 'react'
import MainList from '@/components/followed-new/main-list'
import Pagination from '@/components/common/pagination'
import { debounce } from 'lodash'

const FollowedNew: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [width, setWidth] = useState<number>(1245)
  const newRef = useRef<HTMLDivElement>(null)

  const total = 20

  const onChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      if (newRef.current) {
        const currentWidth = newRef.current.offsetWidth
        if (currentWidth < 1305) {
          setWidth(1040)
        } else {
          setWidth(1245)
        }
      }
    }, 50)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={newRef} className='relative w-100% mt-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col items-center mx-auto'>
        <MainList currentPage={currentPage} />
        <Pagination current={currentPage} total={total} onChange={onChange} />
      </div>
    </div>
  )
}

export default FollowedNew
