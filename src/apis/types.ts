// src/apis/types.ts
// 定义所有 API 的公用类型

// #region 请求体类型
export interface Id {
  id: string
}

export interface Name {
  name: string
}

export interface Email {
  email: string
}

export interface Keyword {
  keyword: string
}

export interface Pagination {
  id?: string
  keyword?: string
  labelName?: string
  sortType?: string
  date?: string
  current: number
  pageSize: number
}

// #endregion

// #region 数据体类型
export interface UserItem {
  /**
   * 用户id
   */
  id: string
  /**
   * 用户名
   */
  username: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户简介
   */
  intro: string
  /**
   * 是否正在关注
   */
  isFollowing: boolean
  /**
   * 用户作品 id 列表
   * 获取用户列表相关接口包含此字段，getUserSimpleAPI 不包含此字段
   */
  works?: string[]
}

export interface WorkNormalItem {
  /**
   * 作者头像
   */
  authorAvatar: string
  /**
   * 作者id
   */
  authorId: string
  /**
   * 作者名称
   */
  authorName: string
  /**
   * 作品id
   */
  id: string
  /**
   * 作品图片列表
   */
  imgList: string[]
  /**
   * 作品封面
   */
  cover: string
  /**
   * 用户是否已经喜欢
   */
  isLiked: boolean
  /**
   * 作品名称
   */
  name: string
  /**
   * 创建时间
   */
  createdAt: string
}

export type HistoryItem = Omit<WorkNormalItem, 'isLiked'> & {
  /**
   * 最后浏览时间
   */
  lastTime: string
}

export interface FavoriteItem {
  /**
   * 收藏夹封面
   */
  cover: null | string
  /**
   * 收藏夹id
   */
  id: string
  /**
   * 收藏夹简介
   */
  intro: string
  /**
   * 收藏夹名称
   */
  name: string
  /**
   * 收藏夹排行顺序
   */
  order: number
  /**
   * 收藏夹作品总数
   */
  workNum: number
}

export interface LabelItem {
  /**
   * 标签颜色，由后台进行随机不重复的颜色生成
   */
  color: string
  /**
   * 标签id
   */
  id: string
  /**
   * 标签封面图片，当该标签的作品数达到一定量级后，由管理员在后台进行上传，默认就是随机生成的纯色背景图
   */
  cover: null | string
  /**
   * 标签名称
   */
  name: string
}

// #endregion
