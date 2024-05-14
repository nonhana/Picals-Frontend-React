import { FC, useState } from 'react'
import { workDetailInfo, normalWorkList, workDetailUserInfo } from '@/test/data'
import WorkInfo from '@/components/work-detail/work-info'
import UserInfo from '@/components/work-detail/user-info'
import { UserItemInfo } from '@/utils/types'

const WorkDetail: FC = () => {
  const [userInfo, setUserInfo] = useState<UserItemInfo>(workDetailUserInfo)

  const follow = (id: string) => {
    console.log('follow', id)
    setUserInfo({ ...userInfo, isFollowed: !userInfo.isFollowed })
  }

  return (
    <div className='bg-#f5f5f5 w-100% flex justify-center'>
      <div className='flex gap-5 my-5'>
        <div>
          <WorkInfo workInfo={workDetailInfo} authorWorkList={normalWorkList} />
        </div>
        <div>
          <UserInfo onFollow={follow} userInfo={userInfo} />
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
