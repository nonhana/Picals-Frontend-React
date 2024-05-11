import type { UserInfo, FavoriteItemInfo } from '@/utils/types'

interface UserState {
  userInfo: UserInfo
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
