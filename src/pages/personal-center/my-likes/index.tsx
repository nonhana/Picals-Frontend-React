import { getUserLikeWorksTotalAPI } from '@/apis'
import WorkList from '@/components/personal-center/work-list'
import { FC, useEffect, useState, useContext } from 'react'

import { PersonalContext } from '..'

const MyLikes: FC = () => {
  const { userId } = useContext(PersonalContext)

  const [workCount, setWorkCount] = useState<number>(0)

  const getLikeWorkCount = async () => {
    try {
      const { data } = await getUserLikeWorksTotalAPI({ id: userId! })
      setWorkCount(data)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getLikeWorkCount()
  }, [userId])

  return (
    <div className='relative w-full'>
      <div className='flex gap-10px py-5 items-center'>
        <span className='select-none title'>最近喜欢</span>
        <div className='bg-neutral rd-full py-3px px-6px text-sm color-white font-bold'>
          <span>{workCount}</span>
        </div>
      </div>
      <WorkList workCount={workCount} getWorkCount={getLikeWorkCount} />
    </div>
  )
}

export default MyLikes
