// /src/test/data.ts
// 用以存放测试用的数据
import type {
  HistorySearchInfo,
  LabelInfo,
  UserItemInfo,
  WorkNormalItemInfo,
  WorkRankItemInfo,
} from '@/utils/types'

// 标签列表
export const labelList: LabelInfo[] = Array(100)
  .fill(0)
  .map((_, index) => {
    return {
      id: index.toString(),
      name: `标签${index}`,
      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }
  })

// 历史记录列表
export const historyList: HistorySearchInfo[] = Array(50)
  .fill(0)
  .map((_, index) => {
    return {
      id: index.toString(),
      name: `历史记录${index}`,
      time: '2024-03-20 15:00',
    }
  })

// 普通作品列表
export const normalWorkList: WorkNormalItemInfo[] = Array(30)
  .fill(0)
  .map((_, index) => {
    return {
      id: String(index),
      imgList: ['https://dummyimage.com/400X400'],
      name: '作品名称1',
      authorId: '1',
      authorName: '作者1',
      authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      isLiked: true,
    }
  })

// 排行榜作品列表
export const rankWorkList: WorkRankItemInfo[] = Array(40)
  .fill(0)
  .map((_, index) => {
    return {
      id: String(index),
      range: index + 1,
      imgList: ['https://dummyimage.com/400X400'],
      name: '作品名称1',
      authorId: '1',
      authorName: '作者1',
      authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      isLiked: true,
      likeCount: 100,
    }
  })

// 用户列表
export const userList: UserItemInfo[] = Array(20)
  .fill(0)
  .map((_, userId) => {
    return {
      id: String(userId),
      username: '用户1',
      email: '1209220829@qq.com',
      avatar: 'https://dummyimage.com/400X400',
      intro:
        '用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介用户个人简介',
      fanNum: 100,
      followNum: 200,
      works: Array(4)
        .fill(0)
        .map((_, workId) => {
          return {
            id: String(userId + workId),
            imgList: ['https://dummyimage.com/400X400'],
            name: '作品名称1',
            authorId: String(userId),
            authorName: '作者1',
            authorAvatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            isLiked: false,
          }
        }),
      isFollowed: false,
    }
  })
