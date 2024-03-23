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
const userList = Array(10)
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
    works: [normalSource[0], normalSource[0], normalSource[0], normalSource[0]],
    follow: (id: string) => {
      console.log('follow', id)
    },
  }))

const Home: FC = () => {
  const [workList, setWorkList] = useState<WorkNormalItemInfo[]>(normalSource)
  const [rankList, setRankList] = useState<WorkRankItemInfo[]>(rankSource)
  const [littleList, setLittleList] = useState<WorkNormalItemInfo[]>(littleSource)

  // 分页相关
  const total = 10
  const [currentPage, setCurrentPage] = useState<number>(1)

  // 点赞作品
  const handleLikeNormalWork = (id: string) => {
    setWorkList((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isLiked: !item.isLiked,
          }
        }
        return item
      })
    })
  }
  // 点赞排行榜作品
  const handleLikeRankWork = (id: string) => {
    setRankList((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isLiked: !item.isLiked,
          }
        }
        return item
      })
    })
  }
  // 点赞小作品
  const handleLikeLittleWork = (id: string) => {
    setLittleList((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isLiked: !item.isLiked,
          }
        }
        return item
      })
    })
  }

  return (
    <div className='h-screen'>
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
          <UserItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Home
