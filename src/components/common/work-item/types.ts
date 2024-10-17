import { HistoryItem } from '@/apis/types'
import { WorkNormalItemInfo } from '@/utils/types'

type PersonalCenterProps = {
  type: 'personal_center'
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
  deleteWork: (id: string) => void
}
type FavoriteProps = {
  type: 'favorite'
  itemInfo: WorkNormalItemInfo
  settingStatus: boolean
  chooseStatus: boolean
  like: (id: string) => void
  choose: (id: string) => void
  cancel: (id: string) => void
  move: (id: string) => void
  copy: (id: string) => void
}
type HistoryProps = {
  type: 'history'
  itemInfo: HistoryItem
}
type UserWorkProps = {
  type: 'user_work'
  itemInfo: WorkNormalItemInfo
  like: (userId: string, workId: string) => void
}
type LeastProps = {
  type: 'least'
  itemInfo: WorkNormalItemInfo
}
type LittleProps = {
  type: 'little'
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
}
type NormalProps = {
  type: 'normal'
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
}

type T =
  | PersonalCenterProps
  | FavoriteProps
  | HistoryProps
  | UserWorkProps
  | LeastProps
  | LittleProps
  | NormalProps

export type WorkItemProps = Partial<Pick<T, 'type'>> & Omit<T, 'type'> & { [key: string]: any }

export type WorkItemType =
  | 'normal'
  | 'little'
  | 'least'
  | 'personal_center'
  | 'favorite'
  | 'history'
  | 'user_work'
