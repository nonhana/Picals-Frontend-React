import { likeActionsAPI, userActionsAPI, searchUserAPI, searchUserTotalAPI } from '@/apis'
import Empty from '@/components/common/empty'
import Pagination from '@/components/common/pagination'
import UserItem from '@/components/common/user-item'
import UserListSkeleton from '@/components/skeleton/user-list'
import { useMap } from '@/hooks'
import { decreaseFollowNum, increaseFollowNum } from '@/store/modules/user'
import type { UserItemInfo } from '@/utils/types'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

type UserListProps = {
  width: number
  labelName: string
}

const UserList: FC<UserListProps> = ({ width, labelName }) => {
  const dispatch = useDispatch()

  const [userList, setUserList, updateUserList] = useMap<UserItemInfo>([])
  const [total, setTotal] = useState(0)

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

  const getUserCount = async () => {
    try {
      const { data } = await searchUserTotalAPI({ keyword: labelName })
      setTotal(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const [searchingUser, setSearchingUser] = useState(true)
  const searchUser = async () => {
    setSearchingUser(true)
    try {
      const { data } = await searchUserAPI({
        keyword: labelName,
        current,
        pageSize,
      })
      setUserList(data)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setSearchingUser(false)
    }
  }

  useEffect(() => {
    getUserCount()
  }, [labelName])

  useEffect(() => {
    searchUser()
  }, [labelName, current])

  return (
    <div className='relative p-5 w-full min-h-160 pb-15'>
      <div className='w-full flex justify-between items-center mb-10px'>
        <div className='flex gap-10px items-center'>
          <div className='title font-size-24px'>
            <span>用户</span>
          </div>
          <div className='px-10px py-5px bg-#858585 rd-full color-white font-size-14px font-bold'>
            <span>{total}</span>
          </div>
        </div>
      </div>

      <CSSTransition
        in={userList.size !== 0 && !searchingUser}
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
        in={userList.size === 0 && !searchingUser}
        timeout={300}
        classNames='opacity-gradient'
        unmountOnExit>
        <Empty />
      </CSSTransition>

      <CSSTransition
        in={userList.size === 0 && searchingUser}
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
