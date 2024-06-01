import type { UserInfo, FavoriteItemInfo } from '@/utils/types'

interface UserState {
  userInfo: UserInfo
  isLogin: boolean
}

interface FavoritesState {
  favoriteList: FavoriteItemInfo[]
}

interface ImageState {
  isDisplaying: boolean
  imgSrc: string
}

export interface AppState {
  user: UserState
  favorite: FavoritesState
  image: ImageState
}
