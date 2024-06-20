import { FC, useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import type { UserItemInfo } from '@/utils/types'
import UserItem from '@/components/common/user-item'
import { useMap } from '@/hooks'
import Pagination from '@/components/common/pagination'
import {
  likeActionsAPI,
  userActionsAPI,
  getFansListAPI,
  getFollowingListAPI,
  getWorkSimpleAPI,
} from '@/apis'
import Empty from '@/components/common/empty'
import { PersonalContext } from '@/pages/personal-center'
import { decreaseFollowNum, increaseFollowNum } from '@/store/modules/user'
import UserListSkeleton from '@/components/skeleton/user-list'
import { CSSTransition } from 'react-transition-group'

type UserListProps = {
  width: number
  total: number
}

const UserList: FC<UserListProps> = ({ width, total }) => {
  const dispatch = useDispatch()

  const { currentPath, userId } = useContext(PersonalContext)

  const [userList, setUserList, updateUserList] = useMap<UserItemInfo>([]) // 用户列表

  // 关注/取消关注
  const handleFollow = async (id: string) => {
    try {
      await userActionsAPI({ id })
      if (!userList.get(id)!.isFollowing) {
        dispatch(increaseFollowNum())
      } else {
        dispatch(decreaseFollowNum())
      }
      updateUserList(id, { ...userList.get(id)!, isFollowing: !userList.get(id)!.isFollowing })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  // 喜欢/取消喜欢用户作品
  const handleLikeWork = async (userId: string, workId: string) => {
    await likeActionsAPI({ id: workId })
    updateUserList(userId, {
      ...userList.get(userId)!,
      works: userList
        .get(userId)!
        .works!.map((work) => (work.id === workId ? { ...work, isLiked: !work.isLiked } : work)),
    })
  }

  /* ----------分页相关--------- */
  const [current, setCurrent] = useState(1)
  const pageSize = 6

  const pageChange = (page: number) => {
    current !== page && setCurrent(page)
  }

  const [gettingUser, setGettingUser] = useState(true) // 获取用户列表中

  const getUserList = async () => {
    setGettingUser(true)
    try {
      const { data } =
        currentPath === 'follow'
          ? await getFollowingListAPI({
              id: userId,
              current,
              pageSize,
            })
          : await getFansListAPI({
              id: userId,
              current,
              pageSize,
            })
      const userSource = await Promise.all(
        data.map(async (user) => {
          const works = await Promise.all(
            user.works!.map(async (workId) => (await getWorkSimpleAPI({ id: workId })).data),
          )
          return { ...user, works }
        }),
      )
      setUserList(userSource)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setGettingUser(false)
    }
  }

  useEffect(() => {
    getUserList()
  }, [currentPath, userId, current])

  return (
    <div className='relative p-5 w-full min-h-160'>
      <CSSTransition
        in={userList.size !== 0 && !gettingUser}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <div className='relative w-full flex flex-col gap-20px pb-10'>
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
        in={userList.size === 0 && !gettingUser}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty />
      </CSSTransition>

      <CSSTransition
        in={userList.size === 0 && gettingUser}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <UserListSkeleton className='absolute top-14' />
      </CSSTransition>

      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <Pagination total={total} pageSize={pageSize} current={current} onChange={pageChange} />
      </div>
    </div>
  )
}

export default UserList
