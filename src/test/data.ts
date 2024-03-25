// /src/test/data.ts
// 用以存放测试用的数据
import type { HistorySearchInfo, LabelInfo, WorkNormalItemInfo } from '@/utils/types'

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
export const normalWorkList: WorkNormalItemInfo[] = Array(24)
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
