import { FC, useEffect, useState } from 'react'
import type { UserItemInfo } from '@/utils/types'
import { userList as userListSource } from '@/test/data'
import UserItem from '@/components/common/user-item'
import { useMap, useAtBottom } from '@/hooks'

type UserListProps = {
  width: number
}

const UserList: FC<UserListProps> = ({ width }) => {
  const [userList, setUserList, updateItem] = useMap<UserItemInfo>([])
  const [currentPage, setCurrentPage] = useState(1)
  const isBottom = useAtBottom()

  const handleFollow = (id: string) => {
    updateItem(id, { ...userList.get(id)!, isFollowed: !userList.get(id)!.isFollowed })
  }

  const handleLikeWork = (userId: string, workId: string) => {
    updateItem(userId, {
      ...userList.get(userId)!,
      works: userList
        .get(userId)!
        .works.map((work) => (work.id === workId ? { ...work, isLiked: !work.isLiked } : work)),
    })
  }

  useEffect(() => {
    setUserList(userListSource)
  }, [])

  useEffect(() => {
    if (isBottom) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [isBottom])

  useEffect(() => {
    if (currentPage === 1) return
    setUserList([...userListSource])
  }, [currentPage])

  return (
    <div className='relative p-5'>
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
  )
}

export default UserList
