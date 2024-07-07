import { FC, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { useParams } from 'react-router-dom'
import WorkInfo from '@/components/work-detail/work-info'
import UserInfo from '@/components/work-detail/user-info'
import ViewList from '@/components/work-detail/view-list'
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
import { notification } from 'antd'
import { decreaseFollowNum, increaseFollowNum } from '@/store/modules/user'
import GreyButton from '@/components/common/grey-button'
import { Icon } from '@iconify/react'
import { useAtBottom, useAtTop } from '@/hooks'
import { CSSTransition } from 'react-transition-group'
import { resetUserList, setWorkDetailUserId } from '@/store/modules/viewList'
import { debounce } from 'lodash'

const ScrollButtons: FC = () => {
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

const WorkDetail: FC = () => {
  const dispatch = useDispatch()
  const { workDetailUserId } = useSelector((state: AppState) => state.viewList)

  const { workId } = useParams<{ workId: string }>()

  const [workInfo, setWorkInfo] = useState<WorkDetailInfo>()
  const [userInfo, setUserInfo] = useState<UserItemInfo>()

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

  const fetchUserInfo = async (authorId: string) => {
    try {
      const { data } = await getUserSimpleAPI({ id: authorId })
      setUserInfo({
        id: data.id,
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        intro: data.intro,
        isFollowing: data.isFollowing,
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const [userWorksCurrent, setUserWorksCurrent] = useState(1)
  const [authorWorkList, setAuthorWorkList] = useState<
    {
      page: number
      list: WorkNormalItemInfo[]
    }[]
  >([{ page: userWorksCurrent, list: [] }])
  const [isFinal, setIsFinal] = useState(false) // 是否获取到最后一页
  const [listEnd, setListEnd] = useState(false) // 浏览列表是否到底
  const [initializing, setInitializing] = useState(true) // 是否正在初始化、加载中
  const [prevAuthorId, setPrevAuthorId] = useState('') // 先前的作品作者id

  const resetUserWorks = () => {
    setAuthorWorkList([{ page: 1, list: [] }])
    setUserWorksCurrent(1)
    setIsFinal(false)
    setListEnd(false)
    setInitializing(true)
  }

  const fetchUserWorks = async (authorId: string) => {
    if (userWorksCurrent === 1) setInitializing(true)
    try {
      const { data } = await getUserWorksListAPI({
        id: authorId,
        pageSize: 30,
        current: userWorksCurrent,
      })
      if (data.length < 30) setIsFinal(true)
      setAuthorWorkList((prev) => {
        const result = prev.map((item) => {
          if (item.page === userWorksCurrent) {
            return { page: item.page, list: data }
          }
          return item
        })
        result.push({ page: userWorksCurrent + 1, list: [] })
        return result
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setInitializing(false)
    }
  }

  useEffect(() => {
    if (listEnd && !isFinal) setUserWorksCurrent((prev) => prev + 1)
  }, [listEnd])

  useEffect(() => {
    if (workInfo) {
      fetchUserWorks(workInfo.authorInfo.id)
    }
  }, [userWorksCurrent])

  useEffect(() => {
    if (workInfo?.authorInfo.id) setPrevAuthorId(workInfo.authorInfo.id)
    const debouncedFetchWorkDetail = debounce(fetchWorkDetail, 500)
    const debouncedAddViewData = debounce(addViewData, 500)

    debouncedFetchWorkDetail()
    debouncedAddViewData()

    return () => {
      debouncedFetchWorkDetail.cancel()
      debouncedAddViewData.cancel()
    }
  }, [workId])

  useEffect(() => {
    if (workInfo) {
      if (workInfo.authorInfo.id !== prevAuthorId) resetUserWorks()
      fetchUserInfo(workInfo.authorInfo.id)
      fetchUserWorks(workInfo.authorInfo.id)
      if (workDetailUserId !== workInfo.authorInfo.id) {
        dispatch(resetUserList())
        dispatch(setWorkDetailUserId(workInfo.authorInfo.id))
      }
    }
  }, [workInfo])

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
      await likeActions(id)
      setWorkInfo((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          likeNum: prev.isLiked ? prev.likeNum - 1 : prev.likeNum + 1,
          isLiked: !prev.isLiked,
        }
      })
    }
    setAuthorWorkList((prev) => {
      return prev.map((item) => {
        return {
          page: item.page,
          list: item.list.map((work) => {
            if (work.id === id) {
              return { ...work, isLiked: !work.isLiked }
            }
            return work
          }),
        }
      })
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

  return (
    <>
      <div className='bg-#f5f5f5 w-full flex justify-center'>
        <div className='flex gap-5 my-5'>
          <div>
            {workInfo ? (
              <WorkInfo
                setAuthorWorkListEnd={setListEnd}
                isFinal={isFinal}
                workId={workId!}
                workInfo={workInfo}
                setWorkInfo={setWorkInfo}
                likeWork={likeWork}
                initializing={initializing}
                setInitializing={setInitializing}
                authorWorkList={authorWorkList}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className='flex flex-col gap-5'>
            {userInfo ? (
              <>
                <UserInfo onFollow={follow} userInfo={userInfo} />
                <div className='sticky top-5'>
                  <ViewList
                    setAuthorWorkListEnd={setListEnd}
                    isFinal={isFinal}
                    workId={workId!}
                    initializing={initializing}
                    setInitializing={setInitializing}
                    authorWorkList={authorWorkList}
                  />
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
      <ScrollButtons />
    </>
  )
}

export default WorkDetail
