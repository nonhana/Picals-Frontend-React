import { getFollowNewWorksTotalAPI } from '@/apis'
import Pagination from '@/components/common/pagination'
import MainList from '@/components/followed-new/main-list'
import { MAX_WIDTH, MIN_WIDTH, TRIGGER_MIN_WIDTH } from '@/utils'
import { FC, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router'

const FollowedNew: FC = () => {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState<number>(0)

  const getFollowNewWorksTotal = async () => {
    try {
      const { data } = await getFollowNewWorksTotalAPI()
      setTotal(data)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getFollowNewWorksTotal()
  }, [])

  const [width, setWidth] = useState<number>(MAX_WIDTH)
  const newRef = useRef<HTMLDivElement>(null)
  const currentWidth = useOutletContext<number>()

  const pageSize = 30

  const onChange = (page: number) => {
    setCurrent(page)
  }

  useEffect(() => {
    if (currentWidth < TRIGGER_MIN_WIDTH) {
      setWidth(MIN_WIDTH)
    } else {
      setWidth(MAX_WIDTH)
    }
  }, [currentWidth])

  return (
    <div ref={newRef} className='relative w-full my-30px select-none'>
      <div style={{ width: `${width}px` }} className='flex flex-col items-center mx-auto'>
        <MainList pageSize={pageSize} current={current} />
        <Pagination total={total} pageSize={pageSize} current={current} onChange={onChange} />
      </div>
    </div>
  )
}

export default FollowedNew
