export type Option = { label: string; value: string }

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

// 用户详细信息
export interface UserDetailInfo extends UserInfo {
  background_img: string
  gender: 0 | 1 | 2
  isFollowed: boolean
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

// 作品详细信息
export interface WorkDetailInfo {
  id: string
  imgList: string[]
  name: string
  intro: string
  labels: Option[]
  isLiked: boolean
  isCollected: boolean
  isReprinted: boolean
  openComment: boolean
  isAIGenerated: boolean
  likeNum: number
  viewNum: number
  collectNum: number
  commentNum: number
  createdDate: string
  updatedDate: string
  authorInfo: {
    id: string
    username: string
    avatar: string
    isFollowed: boolean
  }
  illustratorInfo?: {
    id: string
    username: string
    avatar: string
    homepage: string
  }
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
  type: string
  label: string
  sortType: string
}

// 标签详细信息
export interface LabelDetailInfo extends LabelInfo {
  isMyLike: boolean
  workCount: number
}

// 作品评论信息
export interface CommentItem {
  id: string
  content: string
  createdAt: string
  authorInfo: {
    id: string
    username: string
    avatar: string
  }
  level: number // 0-一级评论 1-二级评论
  replyTo?: {
    id: string
    username: string
  }
  childComments?: CommentItem[]
}

// 上传作品表单信息
export interface UploadWorkFormInfo {
  basicInfo: {
    name: string
    intro: string
    isReprinted: boolean
    openComment: boolean
    isAIGenerated: boolean
  }
  labels: string[] // 标签id列表
  originInfo?: {
    url: string
    authorName: string
    authorHomepage: string
  }
}

// 上传作品信息
export interface UploadWorkInfo extends UploadWorkFormInfo {
  imgList: string[]
}

// 收藏夹item信息
export interface FavoriteItemInfo {
  id: string
  name: string
  order: number
  workNum: number
}

// 收藏作品item信息
export interface WorkFavoriteItemInfo extends WorkNormalItemInfo {
  favoriteId: string
}

// 收藏夹详细信息
export interface FavoriteDetailInfo extends FavoriteItemInfo {
  creatorId: string
  creatorName: string
  intro: string
  cover: string | null
  workList: WorkFavoriteItemInfo[]
}

// 收藏夹表单信息
export interface FavoriteFormInfo {
  name: string
  intro: string
  cover: string | null
}
