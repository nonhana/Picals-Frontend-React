import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/types'
import type { UserItemInfo } from '@/utils/types'
import UserItem from '@/components/common/user-item'
import { useMap, useAtBottom } from '@/hooks'
import { getRecommendUserListAPI, getWorkSimpleAPI, likeActionsAPI, userActionsAPI } from '@/apis'
import Empty from '@/components/common/empty'
import { message } from 'antd'

type UserListProps = {
  width: number
}

const UserList: FC<UserListProps> = ({ width }) => {
  const {
    userInfo: { id: storeId },
  } = useSelector((state: AppState) => state.user)
  const [loading, setLoading] = useState(false)
  const [userList, setUserList, updateItem] = useMap<UserItemInfo>([])
  const [current, setCurrent] = useState(1)

  // 获取推荐用户列表
  const getRecommendUserList = async () => {
    try {
      setLoading(true)
      const { data } = await getRecommendUserListAPI({ current, pageSize: 6 })
      const userSource = await Promise.all(
        data.map(async (user) => {
          const works = await Promise.all(
            user.works.map(async (workId) => (await getWorkSimpleAPI({ id: workId })).data),
          )
          return { ...user, works }
        }),
      )
      setUserList(userSource)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecommendUserList()
  }, [current])

  const isBottom = useAtBottom()

  const handleFollow = async (id: string) => {
    if (id === storeId) {
      message.error('不能关注自己')
      return
    }
    await userActionsAPI({ id })
    updateItem(id, { ...userList.get(id)!, isFollowing: !userList.get(id)!.isFollowing })
  }

  const handleLikeWork = async (userId: string, workId: string) => {
    await likeActionsAPI({ id: workId })
    updateItem(userId, {
      ...userList.get(userId)!,
      works: userList
        .get(userId)!
        .works.map((work) => (work.id === workId ? { ...work, isLiked: !work.isLiked } : work)),
    })
  }

  useEffect(() => {
    if (isBottom) {
      setCurrent((prev) => prev + 1)
    }
  }, [isBottom])

  return (
    <>
      <div className='relative w-full p-5'>
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
      </div>

      {userList.size === 0 && !loading && <Empty />}
    </>
  )
}

export default UserList
