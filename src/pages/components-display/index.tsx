import { FC, useState } from 'react'
import type { WorkNormalItemInfo, WorkRankItemInfo } from '@/utils/types'
import WorkNormalItem from '@/components/common/work-normal-item'
import WorkRankItem from '@/components/common/work-rank-item'
import WorkLittleItem from '@/components/common/work-little-item'
import UserItem from '@/components/common/user-item'
import Pagination from '@/components/common/pagination'

const normalSource: WorkNormalItemInfo[] = [
  {
    id: '1',
    imgList: ['https://dummyimage.com/400X400'],
    name: '作品名称1',
    authorId: '1',
    authorName: '作者1',
    authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    isLiked: true,
  },
]
const rankSource: WorkRankItemInfo[] = [
  {
    id: '1',
    range: 1,
    imgList: ['https://dummyimage.com/400X400'],
    name: '作品名称1',
    authorId: '1',
    authorName: '作者1',
    authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    isLiked: true,
  },
]
const littleSource: WorkNormalItemInfo[] = [
  {
    id: '1',
    imgList: ['https://dummyimage.com/400X400'],
    name: '作品名称1',
    authorId: '1',
    authorName: '作者1',
    authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    isLiked: true,
  },
]
const userSource = Array(1)
  .fill(0)
  .map((_, index) => ({
    id: String(index),
    username: '用户1',
    email: '1209220829@qq.com',
    avatar: 'https://dummyimage.com/400X400',
    intro:
      '用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介',
    fanNum: 100,
    followNum: 200,
    works: Array(4)
      .fill(0)
      .map((_, index) => {
        return {
          id: String(index),
          imgList: ['https://dummyimage.com/400X400'],
          name: '作品名称1',
          authorId: '1',
          authorName: '作者1',
          authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          isLiked: false,
        }
      }),
    isFollowed: false,
  }))

const ComponentsDisplay: FC = () => {
  const [workList, setWorkList] = useState<WorkNormalItemInfo[]>(normalSource)
  const [rankList, setRankList] = useState<WorkRankItemInfo[]>(rankSource)
  const [littleList, setLittleList] = useState<WorkNormalItemInfo[]>(littleSource)
  const [userList, setUserList] = useState(userSource)

  // 分页相关
  const total = 10
  const [currentPage, setCurrentPage] = useState<number>(1)

  // 通用的更新列表项的逻辑
  const updateItemInList = <T extends { id: string }>(
    list: T[],
    itemId: string,
    updateFn: (item: T) => T,
  ): T[] => {
    const result = list.map((item) => (item.id === itemId ? updateFn(item) : item))
    console.log(result)
    return result
  }

  // 创建高阶函数来生成处理点赞和关注的函数
  const createHandleToggle = <T extends { id: string }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    key: keyof T,
  ) => {
    return (id: string) => {
      setState((prev) => updateItemInList(prev, id, (item) => ({ ...item, [key]: !item[key] })))
    }
  }

  // 使用高阶函数生成具体的处理函数
  const handleLikeNormalWork = createHandleToggle<(typeof workList)[0]>(setWorkList, 'isLiked')
  const handleLikeRankWork = createHandleToggle<(typeof rankList)[0]>(setRankList, 'isLiked')
  const handleLikeLittleWork = createHandleToggle<(typeof littleList)[0]>(setLittleList, 'isLiked')
  const handleFollowUser = createHandleToggle<(typeof userList)[0]>(setUserList, 'isFollowed')

  // 特殊情况：处理用户作品的点赞
  const handleLikeUserWork = (userId: string, workId: string) => {
    console.log(userId, workId)
    setUserList((prev) =>
      updateItemInList(prev, userId, (user) => ({
        ...user,
        works: updateItemInList(user.works, workId, (work) => ({
          ...work,
          isLiked: !work.isLiked,
        })),
      })),
    )
  }

  return (
    <div className='h-100% flex flex-col gap-10 items-center'>
      <div>
        {workList.map((item) => (
          <WorkNormalItem key={item.id} itemInfo={item} like={handleLikeNormalWork} />
        ))}
      </div>

      <div>
        {rankList.map((item) => (
          <WorkRankItem key={item.id} itemInfo={item} like={handleLikeRankWork} />
        ))}
      </div>

      <div>
        {littleList.map((item) => (
          <WorkLittleItem key={item.id} itemInfo={item} like={handleLikeLittleWork} />
        ))}
      </div>

      <div className='p-5 bg-white'>
        <Pagination total={total} current={currentPage} onChange={setCurrentPage} />
      </div>

      <div className='flex flex-col gap-10'>
        {userList.map((item) => (
          <UserItem
            key={item.id}
            {...item}
            follow={handleFollowUser}
            likeWork={handleLikeUserWork}
          />
        ))}
      </div>
    </div>
  )
}

export default ComponentsDisplay
