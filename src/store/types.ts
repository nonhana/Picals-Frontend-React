import { LabelItem } from '@/apis/types'
import type { UserInfo, FavoriteItemInfo, UploadWorkFormInfo } from '@/utils/types'

interface UserState {
  userInfo: UserInfo
  likedLabels: LabelItem[]
  isLogin: boolean
}

interface FavoritesState {
  favoriteList: FavoriteItemInfo[]
}

interface SearchHistoryState {
  historyList: string[]
}

interface UploadFormState {
  imgList: string[]
  formInfo: UploadWorkFormInfo
}

export interface AppState {
  user: UserState
  favorite: FavoritesState
  searchHistory: SearchHistoryState
  uploadForm: UploadFormState
}
