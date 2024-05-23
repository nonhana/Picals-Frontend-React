import { FC, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import MainList from '@/components/followed-new/main-list'
import Pagination from '@/components/common/pagination'
import { getFollowNewWorksTotalAPI } from '@/apis'

const FollowedNew: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState<number>(0)

  const getFollowNewWorksTotal = async () => {
    try {
      const { data } = await getFollowNewWorksTotalAPI()
      setTotal(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFollowNewWorksTotal()
  }, [])

  const [width, setWidth] = useState<number>(1245)
  const newRef = useRef<HTMLDivElement>(null)
  const currentWidth = useOutletContext<number>()

  const pageSize = 30

  const onChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (currentWidth < 1305) {
      setWidth(1040)
    } else {
      setWidth(1245)
    }
  }, [currentWidth])

  return (
    <div ref={newRef} className='relative w-100% my-30px'>
      <div style={{ width: `${width}px` }} className='flex flex-col items-center mx-auto'>
        <MainList pageSize={pageSize} current={currentPage} />
        <Pagination pageSize={pageSize} current={currentPage} total={total} onChange={onChange} />
      </div>
    </div>
  )
}

export default FollowedNew
