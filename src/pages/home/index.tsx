import { FC } from 'react'
import LabelList from '@/components/home/label-list/index'
import FollowedWorks from '@/components/home/followed-works'
import { labelList, normalWorkList } from '@/test/data'

const Home: FC = () => {
  return (
    <div className='w-100% p-20px'>
      <LabelList labelList={labelList} />
      <FollowedWorks workList={normalWorkList} />
    </div>
  )
}

export default Home
