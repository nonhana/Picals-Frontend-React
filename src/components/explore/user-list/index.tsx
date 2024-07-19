import { getRecommendUserListAPI, likeActionsAPI, userActionsAPI } from '@/apis'
import { Pagination } from '@/apis/types'
import UserItem from '@/components/common/user-item'
import UserListSkeleton from '@/components/skeleton/user-list'
import { useAtBottom } from '@/hooks'
import { increaseFollowNum, decreaseFollowNum, setTempId } from '@/store/modules/user'
import { AppState } from '@/store/types'
import { generateTempId } from '@/utils'
import type { UserItemInfo } from '@/utils/types'
import { message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

type UserListProps = {
  width: number
}

const UserList: FC<UserListProps> = ({ width }) => {
  const dispatch = useDispatch()

  const { id: storeId } = useSelector((state: AppState) => state.user.userInfo)
  const { isLogin, tempId } = useSelector((state: AppState) => state.user)
  const [current, setCurrent] = useState(1)
  const [recommendUserList, setRecommendUserList] = useState<
    {
      page: number
      list: UserItemInfo[]
    }[]
  >([{ page: current, list: [] }])
  const atBottom = useAtBottom()
  const [isFinal, setIsFinal] = useState(false)

  // 获取推荐用户列表
  const getRecommendUserList = async () => {
    try {
      const params: Pagination = { current, pageSize: 6 }
      if (!isLogin) {
        if (!tempId) dispatch(setTempId(generateTempId()))
        params.id = tempId
      }
      const { data } = await getRecommendUserListAPI(params)
      if (data.length < 6) setIsFinal(true)
      setRecommendUserList((prev) => {
        const result = prev.map((item) => {
          if (item.page === current) {
            return { page: item.page, list: data }
          }
          return item
        })
        if (!isFinal) result.push({ page: current + 1, list: [] })
        return result
      })
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (atBottom && !isFinal) setCurrent((prev) => prev + 1)
  }, [atBottom])

  useEffect(() => {
    getRecommendUserList()
  }, [current])

  const handleFollow = async (page: number, id: string) => {
    if (id === storeId) {
      message.error('不能关注自己')
      return
    }
    // 获取到对应的userItem
    const userItem = recommendUserList
      .find((item) => item.page === page)!
      .list.find((user) => user.id === id)
    try {
      await userActionsAPI({ id })
      if (!userItem!.isFollowing) {
        dispatch(increaseFollowNum())
      } else {
        dispatch(decreaseFollowNum())
      }
      setRecommendUserList(
        recommendUserList.map((item) => {
          if (item.page === page) {
            return {
              page: item.page,
              list: item.list.map((user) =>
                user.id === id ? { ...user, isFollowing: !user.isFollowing } : user,
              ),
            }
          }
          return item
        }),
      )
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  const handleLikeWork = async (page: number, userId: string, workId: string) => {
    try {
      await likeActionsAPI({ id: workId })
      setRecommendUserList(
        recommendUserList.map((item) => {
          if (item.page === page) {
            return {
              page: item.page,
              list: item.list.map((user) =>
                user.id === userId
                  ? {
                      ...user,
                      works: user.works!.map((work) =>
                        work.id === workId ? { ...work, isLiked: !work.isLiked } : work,
                      ),
                    }
                  : user,
              ),
            }
          }
          return item
        }),
      )
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  return (
    <div className='relative w-full p-5 min-h-125'>
      {recommendUserList.map((everyPage) => (
        <CSSTransition
          key={everyPage.page}
          in={everyPage.list.length !== 0}
          timeout={300}
          classNames='opacity-gradient'
          unmountOnExit>
          <div className='relative w-full flex flex-col gap-20px'>
            {everyPage.list.map((user) => (
              <UserItem
                key={user.id}
                {...user}
                width={width}
                follow={(id) => handleFollow(everyPage.page, id)}
                likeWork={(userId, workId) => handleLikeWork(everyPage.page, userId, workId)}
              />
            ))}
          </div>
        </CSSTransition>
      ))}

      {!isFinal && <UserListSkeleton row={1} />}
    </div>
  )
}

export default UserList
