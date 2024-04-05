import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LabelList from '@/components/personal-center/my-works/label-list'
import WorkList from '@/components/personal-center/my-works/work-list'

const MyWorks: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [workCount, setWorkCount] = useState<number>()

  useEffect(() => {
    setWorkCount(1000)
  }, [userId])

  return (
    <div className='relative w-320'>
      <div className='flex gap-10px py-5 items-center'>
        <span className='title'>插画</span>
        <div className='bg-#858585 rd-full py-3px px-6px font-size-14px color-#fff font-bold'>
          <span>{workCount}</span>
        </div>
      </div>
      <LabelList />
      <WorkList />
    </div>
  )
}

export default MyWorks
