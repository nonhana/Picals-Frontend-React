// 用户个人信息
export interface UserInfo {
  id: string
  username: string
  email: string
  avatar: string
  intro: string
  fanNum: number
  followNum: number
}

// 标签信息
export interface LabelInfo {
  id: string
  name: string
  img: string
  color: string
}

// 历史搜索记录信息
export interface HistorySearchInfo {
  id: string
  name: string
  time: string
}

// 普通作品item信息
export interface WorkNormalItemInfo {
  id: string
  imgList: string[]
  name: string
  authorId: string
  authorName: string
  authorAvatar: string
  isLiked: boolean
}

// 排行榜作品item信息
export interface WorkRankItemInfo {
  id: string
  range: number
  imgList: string[]
  name: string
  authorId: string
  authorName: string
  authorAvatar: string
  isLiked: boolean
}

// 用户item信息
export interface UserItemInfo extends UserInfo {
  works: WorkNormalItemInfo[]
  isFollowed: boolean
}

// 搜索条件
export interface SearchFilter {
  type: 'work' | 'user'
  label: string
  sortType: 'new' | 'old' | 'like' | 'collect'
}

// 标签详细信息
export interface LabelDetailInfo extends LabelInfo {
  isMyLike: boolean
  workCount: number
}
