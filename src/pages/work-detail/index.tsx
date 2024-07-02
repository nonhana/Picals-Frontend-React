import { FC, useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import WorkInfo from '@/components/work-detail/work-info'
import UserInfo from '@/components/work-detail/user-info'
import { UserItemInfo, WorkDetailInfo, WorkNormalItemInfo } from '@/utils/types'
import {
  getWorkDetailAPI,
  getUserWorksListAPI,
  userActionsAPI,
  getUserSimpleAPI,
  addWorkViewAPI,
  likeActionsAPI,
  postViewHistoryAPI,
} from '@/apis'
import { useMap } from '@/hooks'
import { notification } from 'antd'
import { decreaseFollowNum, increaseFollowNum } from '@/store/modules/user'
import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react'
import { useAtBottom, useAtTop } from '@/hooks'
import { CSSTransition } from 'react-transition-group'

const WorkDetail: FC = () => {
  const dispatch = useDispatch()

  const { workId } = useParams<{ workId: string }>()

  const [workInfo, setWorkInfo] = useState<WorkDetailInfo>()
  const [userInfo, setUserInfo] = useState<UserItemInfo>()
  const [authorWorkList, setAuthorWorkList, updateAuthorWorkList] = useMap<WorkNormalItemInfo>([])

  const addViewData = async () => {
    try {
      await postViewHistoryAPI({ id: workId! })
      await addWorkViewAPI({ id: workId! })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const fetchWorkDetail = async () => {
    try {
      const { data } = await getWorkDetailAPI({ id: workId! })
      if (!data) {
        notification.error({
          message: '作品不存在',
          description: '该作品id存在问题，不要手动输入的说',
        })
        return
      }

      const { authorId, ...rest } = data
      const authorInfo = (await getUserSimpleAPI({ id: authorId })).data
      const labels = data.labels.map((label) => ({ value: label.id, label: label.name }))

      setWorkInfo({ ...rest, authorInfo, labels })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const fetchUserInfoAndWorks = async (authorId: string) => {
    try {
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
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    fetchWorkDetail()
    addViewData()
  }, [workId])

  useEffect(() => {
    if (workInfo) fetchUserInfoAndWorks(workInfo.authorInfo.id)
  }, [workInfo?.id])

  const follow = useCallback(
    async (id: string) => {
      if (!userInfo) return
      try {
        await userActionsAPI({ id })
        if (!userInfo.isFollowing) {
          dispatch(increaseFollowNum())
        } else {
          dispatch(decreaseFollowNum())
        }
        setWorkInfo((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            authorInfo: { ...prev.authorInfo, isFollowing: !prev.authorInfo.isFollowing },
          }
        })
      } catch (error) {
        console.log('出现错误了喵！！', error)
        return
      }
    },
    [userInfo],
  )

  useEffect(() => {
    if (workInfo?.authorInfo) {
      setUserInfo((prev) => prev && { ...prev, isFollowing: workInfo.authorInfo.isFollowing })
    }
  }, [workInfo?.authorInfo.isFollowing])

  const likeWork = async (id: string) => {
    if (workId === id) {
      setWorkInfo((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          likeNum: prev.isLiked ? prev.likeNum - 1 : prev.likeNum + 1,
          isLiked: !prev.isLiked,
        }
      })
    }
    await likeActions(id)
    updateAuthorWorkList(id, {
      ...authorWorkList.get(id)!,
      isLiked: !authorWorkList.get(id)!.isLiked,
    })
  }

  const likeActions = async (id: string) => {
    try {
      await likeActionsAPI({ id })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  /* ----------页面滚动相关---------- */

  const isBottom = useAtBottom()
  const isTop = useAtTop()

  const scrollTo = (type: 'top' | 'bottom') => {
    if (type === 'top') {
      document.body.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.body.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className='bg-#f5f5f5 w-full flex justify-center'>
        <div className='flex gap-5 my-5'>
          <div>
            {workInfo ? (
              <WorkInfo
                workInfo={workInfo}
                setWorkInfo={setWorkInfo}
                likeWork={likeWork}
                authorWorkList={Array.from(authorWorkList.values())}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div>
            {userInfo ? (
              <UserInfo
                onFollow={follow}
                userInfo={userInfo}
                authorWorkList={Array.from(authorWorkList.values())}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>

      <CSSTransition in={!isTop} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div className='fixed bottom-25 right-10'>
          <GreyButton
            onClick={() => {
              scrollTo('top')
            }}>
            <Icon color='#fff' icon='ant-design:arrow-up-outlined' />
          </GreyButton>
        </div>
      </CSSTransition>
      <CSSTransition in={!isBottom} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div className='fixed bottom-10 right-10'>
          <GreyButton
            onClick={() => {
              scrollTo('bottom')
            }}>
            <Icon color='#fff' icon='ant-design:arrow-down-outlined' />
          </GreyButton>
        </div>
      </CSSTransition>
    </>
  )
}

export default WorkDetail
