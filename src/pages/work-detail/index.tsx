import { FC } from 'react'
import { workDetailInfo, normalWorkList, workDetailUserInfo } from '@/test/data'
import WorkInfo from '@/components/work-detail/work-info'
import UserInfo from '@/components/work-detail/user-info'

const WorkDetail: FC = () => {
  const follow = (id: string) => {
    console.log('follow', id)
  }

  return (
    <div className='bg-#f5f5f5 w-100% flex justify-center'>
      <div className='flex gap-5 my-5'>
        <div>
          <WorkInfo workInfo={workDetailInfo} authorWorkList={normalWorkList} />
        </div>
        <div>
          <UserInfo onFollow={follow} userInfo={workDetailUserInfo} />
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
