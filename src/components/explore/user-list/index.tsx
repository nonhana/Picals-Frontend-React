import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@/store/types'
import type { UserItemInfo } from '@/utils/types'
import UserItem from '@/components/common/user-item'
import { useMap, useAtBottom } from '@/hooks'
import { getRecommendUserListAPI, getWorkSimpleAPI, likeActionsAPI, userActionsAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { message } from 'antd'
import { increaseFollowNum, decreaseFollowNum } from '@/store/modules/user'
import UserListSkeleton from '@/components/skeleton/user-list'
import { CSSTransition } from 'react-transition-group'

type UserListProps = {
  width: number
}

const UserList: FC<UserListProps> = ({ width }) => {
  const dispatch = useDispatch()

  const { id: storeId } = useSelector((state: AppState) => state.user.userInfo)
  const [loading, setLoading] = useState(true)
  const [userList, setUserList, updateItem] = useMap<UserItemInfo>([])
  const [current, setCurrent] = useState(1)
  const atBottom = useAtBottom()
  const [isFinal, setIsFinal] = useState(false)

  // 获取推荐用户列表
  const getRecommendUserList = async () => {
    setLoading(true)
    try {
      const { data } = await getRecommendUserListAPI({ current, pageSize: 6 })
      if (data.length < 6) setIsFinal(true)
      const userSource = await Promise.all(
        data.map(async (user) => {
          const works = await Promise.all(
            user.works!.map(async (workId) => (await getWorkSimpleAPI({ id: workId })).data),
          )
          return { ...user, works }
        }),
      )
      setUserList([...Array.from(userList.values()), ...userSource])
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (atBottom && !isFinal) setCurrent((prev) => prev + 1)
  }, [atBottom])

  useEffect(() => {
    getRecommendUserList()
  }, [current])

  const handleFollow = async (id: string) => {
    if (id === storeId) {
      message.error('不能关注自己')
      return
    }
    try {
      await userActionsAPI({ id })
      if (!userList.get(id)!.isFollowing) {
        dispatch(increaseFollowNum())
      } else {
        dispatch(decreaseFollowNum())
      }
      updateItem(id, { ...userList.get(id)!, isFollowing: !userList.get(id)!.isFollowing })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const handleLikeWork = async (userId: string, workId: string) => {
    try {
      await likeActionsAPI({ id: workId })
      updateItem(userId, {
        ...userList.get(userId)!,
        works: userList
          .get(userId)!
          .works!.map((work) => (work.id === workId ? { ...work, isLiked: !work.isLiked } : work)),
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  return (
    <div className='relative w-full p-5 min-h-125'>
      <CSSTransition
        in={userList.size !== 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-col gap-20px'>
          {Array.from(userList.values()).map((item) => (
            <UserItem
              key={item.id}
              {...item}
              width={width}
              follow={handleFollow}
              likeWork={handleLikeWork}
            />
          ))}
        </div>
      </CSSTransition>

      <CSSTransition
        in={userList.size === 0 && !loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty />
      </CSSTransition>

      <CSSTransition
        in={userList.size === 0 && loading}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <UserListSkeleton className='absolute top-5' />
      </CSSTransition>
    </div>
  )
}

export default UserList
