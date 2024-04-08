import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WorkList from '@/components/personal-center/work-list'

const MyLikes: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [workCount, setWorkCount] = useState<number>()

  useEffect(() => {
    setWorkCount(1000)
  }, [userId])

  return (
    <div className='relative w-320'>
      <div className='flex gap-10px py-5 items-center'>
        <span className='title'>最近喜欢</span>
        <div className='bg-#858585 rd-full py-3px px-6px font-size-14px color-#fff font-bold'>
          <span>{workCount}</span>
        </div>
      </div>
      <WorkList />
    </div>
  )
}

export default MyLikes
