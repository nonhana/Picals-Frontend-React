import { FC, useState, useEffect, useContext } from 'react'
import UserList from '@/components/personal-center/user-list'
import { getFollowingTotalAPI } from '@/apis'
import { PersonalContext } from '..'

const MyFollow: FC = () => {
  const { userId } = useContext(PersonalContext)

  const [total, setTotal] = useState(0) // 用户总数

  const getFollowingTotal = async () => {
    try {
      const { data } = await getFollowingTotalAPI({ id: userId })
      setTotal(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    getFollowingTotal()
  }, [userId])

  return (
    <div className='relative w-full'>
      <div className='flex gap-10px py-5 items-center'>
        <span className='select-none title'>关注列表</span>
        <div className='bg-#858585 rd-full py-3px px-6px font-size-14px color-white font-bold'>
          <span>{total}</span>
        </div>
      </div>
      <UserList width={320} total={total} />
    </div>
  )
}

export default MyFollow
