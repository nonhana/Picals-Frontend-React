import { getFansTotalAPI } from '@/apis'
import UserList from '@/components/personal-center/user-list'
import { FC, useState, useEffect, useContext } from 'react'

import { PersonalContext } from '..'

const MyFans: FC = () => {
  const { userId, width } = useContext(PersonalContext)

  const [total, setTotal] = useState(0) // 用户总数

  const getFansTotal = async () => {
    try {
      const { data } = await getFansTotalAPI({ id: userId })
      setTotal(data)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getFansTotal()
  }, [userId])

  return (
    <div className='relative w-full'>
      <div className='flex gap-10px py-5 items-center'>
        <span className='select-none title'>粉丝列表</span>
        <div className='bg-deepgrey rd-full py-3px px-6px font-size-m color-white font-bold'>
          <span>{total}</span>
        </div>
      </div>
      <UserList width={width} total={total} />
    </div>
  )
}

export default MyFans
