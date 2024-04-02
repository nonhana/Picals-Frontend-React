// /src/test/data.ts
// 用以存放测试用的数据
import type {
  HistorySearchInfo,
  LabelInfo,
  UserItemInfo,
  WorkNormalItemInfo,
  WorkRankItemInfo,
  LabelDetailInfo,
  WorkDetailInfo,
  CommentItem,
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

// 标签详细信息
export const labelDetailInfo: LabelDetailInfo = {
  id: '1',
  name: '标签1',
  img: 'https://img.yzcdn.cn/vant/cat.jpeg',
  color: '#3d3d3d',
  isMyLike: false,
  workCount: 100,
}

// 作品详细信息
export const workDetailInfo: WorkDetailInfo = {
  id: '1',
  imgList: [
    'https://dummyimage.com/400X400',
    'https://dummyimage.com/400X400',
    'https://dummyimage.com/400X400',
  ],
  name: '作品名称',
  // authorId: '1',
  // authorName: 'non_hana',
  // authorAvatar: 'https://dummyimage.com/400X400',
  isLiked: false,
  isCollected: false,
  intro:
    '这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介这是作品的简介',
  labels: Array(100)
    .fill(0)
    .map((_, index) => ({
      value: index.toString(),
      label: `标签${index}`,
    })),
  isReprinted: false,
  openComment: true,
  isAIGenerated: false,
  likeNum: 100,
  viewNum: 1000,
  collectNum: 100,
  commentNum: 2000,
  createdDate: '2024-03-20 15:00',
  updatedDate: '2024-03-20 15:00',
  authorInfo: {
    id: '1',
    username: 'non_hana',
    avatar: 'https://dummyimage.com/400X400',
    isFollowed: false,
  },
  illustratorInfo: {
    id: '1',
    username: 'ちふり',
    avatar: 'https://dummyimage.com/400X400',
    homepage: 'https://www.pixiv.net/users/12818930',
  },
}

// 作品评论列表
export const workCommentList: CommentItem[] = Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index.toString(),
    content:
      '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
    createdAt: '2024-03-20 15:00',
    authorInfo: {
      id: '1',
      username: 'non_hana',
      avatar: 'https://dummyimage.com/400X400',
      isFollowed: false,
    },
    level: 0,
    childComments: Array(4)
      .fill(0)
      .map((_, childIndex) => ({
        id: childIndex.toString(),
        content:
          '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
        createdAt: '2024-03-20 15:00',
        authorInfo: {
          id: '1',
          username: 'non_hana',
          avatar: 'https://dummyimage.com/400X400',
          isFollowed: false,
        },
        replyTo: {
          id: '1',
          username: 'non_hana',
        },
        level: 1,
      })),
  }))

// 作品详情页面用户信息
export const workDetailUserInfo: UserItemInfo = userList[0]
