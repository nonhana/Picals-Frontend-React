// 用户个人信息
export interface UserInfo {
  id: string
  username: string
  email: string
  avatar: string
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
