import { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import WorkInfo from '@/components/work-detail/work-info'
import UserInfo from '@/components/work-detail/user-info'
import { UserItemInfo, WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import { getWorkDetailAPI, getUserWorksListAPI, userActionsAPI, getUserSimpleAPI } from '@/apis'

const WorkDetail: FC = () => {
  const { workId } = useParams<{ workId: string }>()

  const [workInfoLoading, setWorkInfoLoading] = useState(true)
  const [workInfo, setWorkInfo] = useState<WorkDetailInfo>()
  const [userInfoLoading, setUserInfoLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<UserItemInfo>()
  const [authorWorkListLoading, setAuthorWorkListLoading] = useState(true)
  const [authorWorkList, setAuthorWorkList] = useState<WorkNormalItemInfo[]>([])

  const fetchWorkDetail = async () => {
    try {
      setWorkInfoLoading(true)
      const { data } = await getWorkDetailAPI({ id: workId! })
      console.log('data', data)
      const { authorId, ...rest } = data
      const authorInfo = (await getUserSimpleAPI({ id: authorId })).data
      const labels = data.labels.map((label) => ({ value: label.id, label: label.name }))

      setWorkInfo({ ...rest, authorInfo, labels })
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    } finally {
      setWorkInfoLoading(false)
    }
  }

  const fetchUserInfoAndWorks = async (authorId: string) => {
    try {
      setUserInfoLoading(true)
      setAuthorWorkListLoading(true)

      const userInfoPromise = getUserSimpleAPI({ id: authorId })
      const authorWorksListPromise = getUserWorksListAPI({ id: authorId, pageSize: 30, current: 1 })

      const [userInfoResponse, authorWorksListResponse] = await Promise.all([
        userInfoPromise,
        authorWorksListPromise,
      ])

      const userInfoData = userInfoResponse.data
      const authorWorksListData = authorWorksListResponse.data

      setUserInfo({
        id: userInfoData.id,
        username: userInfoData.username,
        avatar: userInfoData.avatar,
        intro: userInfoData.intro,
        isFollowing: userInfoData.isFollowing,
      })
      setAuthorWorkList(authorWorksListData)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    } finally {
      setUserInfoLoading(false)
      setAuthorWorkListLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkDetail()
  }, [workId])

  useEffect(() => {
    if (workInfo) {
      fetchUserInfoAndWorks(workInfo.authorInfo.id)
    }
  }, [workInfo])

  const follow = useCallback(
    async (id: string) => {
      if (!userInfo) return
      try {
        await userActionsAPI({ id })
        setUserInfo((prev) => prev && { ...prev, isFollowing: !prev.isFollowing })
      } catch (error) {
        console.error('出现错误了喵！！', error)
        return
      }
    },
    [userInfo],
  )

  const workInfoContent = useMemo(() => {
    if (workInfo && !workInfoLoading && !authorWorkListLoading) {
      return <WorkInfo workInfo={workInfo} authorWorkList={authorWorkList} />
    }
    return <div>Loading...</div> // TODO: 预计替换为骨架屏
  }, [workInfo, workInfoLoading, authorWorkListLoading, authorWorkList])

  const userInfoContent = useMemo(() => {
    if (userInfo && !userInfoLoading && !authorWorkListLoading) {
      return <UserInfo onFollow={follow} userInfo={userInfo} authorWorkList={authorWorkList} />
    }
    return <div>Loading...</div> // TODO: 预计替换为骨架屏
  }, [userInfo, userInfoLoading, authorWorkListLoading, authorWorkList, follow])

  return (
    <div className='bg-#f5f5f5 w-100% flex justify-center'>
      <div className='flex gap-5 my-5'>
        <div>{workInfoContent}</div>
        <div>{userInfoContent}</div>
      </div>
    </div>
  )
}

export default WorkDetail
