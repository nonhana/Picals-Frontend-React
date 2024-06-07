import { LabelItem } from '@/apis/types'
import type { UserInfo, FavoriteItemInfo } from '@/utils/types'

interface UserState {
  userInfo: UserInfo
  likedLabels: LabelItem[]
  isLogin: boolean
}

interface FavoritesState {
  favoriteList: FavoriteItemInfo[]
}

interface searchHistoryState {
  historyList: string[]
}

export interface AppState {
  user: UserState
  favorite: FavoritesState
  searchHistory: searchHistoryState
}
