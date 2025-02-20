import type { HistoryItem } from '@/apis/types'
import type { AnimationVariantKeys } from '@/components/motion/preset'
import type { WorkNormalItemInfo } from '@/utils/types'

interface PersonalCenterProps {
  type: 'personal_center'
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
  deleteWork: (id: string) => void
}
interface FavoriteProps {
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
interface HistoryProps {
  type: 'history'
  itemInfo: HistoryItem
}
interface UserWorkProps {
  type: 'user_work'
  itemInfo: WorkNormalItemInfo
  like: (userId: string, workId: string) => void
}
interface LeastProps {
  type: 'least'
  itemInfo: WorkNormalItemInfo
}
interface LittleProps {
  type: 'little'
  itemInfo: WorkNormalItemInfo
  like: (id: string) => void
}
interface NormalProps {
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

export type WorkItemProps = Partial<Pick<T, 'type'>> &
  Omit<T, 'type'> & {
    animation?: AnimationVariantKeys
    [key: string]: any
  }

export type WorkItemType =
  | 'normal'
  | 'little'
  | 'least'
  | 'personal_center'
  | 'favorite'
  | 'history'
  | 'user_work'
