import type { UserInfo, FavoriteItemInfo } from '@/utils/types'

interface UserState {
  userInfo: UserInfo
}

interface FavoritesState {
  favoriteList: FavoriteItemInfo[]
}

export interface AppState {
  user: UserState
  favorite: FavoritesState
}
