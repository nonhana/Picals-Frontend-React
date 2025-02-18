import { getUserWorksTotalAPI } from '@/apis'
import LabelList from '@/components/personal-center/label-list'
import WorkList from '@/components/personal-center/work-list'
import { FC, useEffect, useState, useContext } from 'react'

import { PersonalContext } from '..'

const MyWorks: FC = () => {
  const { userId } = useContext(PersonalContext)

  const [workCount, setWorkCount] = useState<number>(0)

  const getWorkCount = async () => {
    try {
      const { data } = await getUserWorksTotalAPI({ id: userId })
      setWorkCount(data)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getWorkCount()
  }, [userId])

  return (
    <div className='relative w-full'>
      <div className='flex gap-10px py-5 items-center'>
        <span className='select-none title'>插画</span>
        <div className='bg-deepgrey rd-full py-3px px-6px font-size-m color-white font-bold'>
          <span>{workCount}</span>
        </div>
      </div>
      <div className='mb-5'>
        <LabelList />
      </div>
      <WorkList workCount={workCount} getWorkCount={getWorkCount} />
    </div>
  )
}

export default MyWorks
