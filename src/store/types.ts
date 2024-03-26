import type { UserInfo } from '@/utils/types'

interface UserState {
  userInfo: UserInfo
}

export interface AppState {
  user: UserState
}
