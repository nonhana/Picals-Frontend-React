import { FC, useEffect, useState } from 'react'
import type { UserItemInfo } from '@/utils/types'
import { userList as userListSource } from '@/test/data'
import UserItem from '@/components/common/user-item'
import { useMap } from '@/hooks'
import Pagination from '@/components/common/pagination'

type UserListProps = {
  width: number
}

const UserList: FC<UserListProps> = ({ width }) => {
  const [userList, setUserList, updateItem] = useMap<UserItemInfo>([])

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

  /* ----------分页相关--------- */
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 30
  const total = 1000

  const pageChange = (page: number) => {
    currentPage !== page && setCurrentPage(page)
  }

  useEffect(() => {
    console.log('currentPage:', currentPage)
  }, [currentPage])

  useEffect(() => {
    if (currentPage === 1) return
    setUserList([...userListSource])
  }, [currentPage])

  return (
    <div className='relative p-5'>
      <div className='w-100% flex justify-between items-center mb-10px'>
        <div className='flex gap-10px items-center'>
          <div className='title font-size-24px'>
            <span>用户</span>
          </div>
          <div className='px-10px py-5px bg-#858585 rd-full color-#fff font-size-14px font-bold'>
            <span>{total}</span>
          </div>
        </div>
      </div>

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

      <div className='flex justify-center'>
        <Pagination total={total} pageSize={pageSize} current={currentPage} onChange={pageChange} />
      </div>
    </div>
  )
}

export default UserList
