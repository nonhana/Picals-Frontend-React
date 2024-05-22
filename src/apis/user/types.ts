// src/apis/user/types.ts
// 定义 user 模块的 API 类型

// #region 请求体类型
export interface IRefreshTokenReq {
  refreshToken: string
}

export interface IRegisterReq {
  email: string
  password: string
  verification_code: string
}

export interface ILoginReq {
  email: string
  password: string
}

export interface IUpdateUserInfoReq {
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 用户空间背景图片
   */
  backgroundImg?: string
  /**
   * 用户个性签名
   */
  signature?: string
  /**
   * 用户名
   */
  username?: string
  /**
   * 用户性别，0-男，1-女，2-未知
   */
  gender?: 0 | 1 | 2
}

export interface IChangePasswordReq {
  password: string
  verification_code: string
}

export interface IChangeEmailReq {
  email: string
  verification_code: string
}
// #endregion

// #region 返回体类型
export interface UserDetailInfo {
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户背景图
   */
  backgroundImg: string
  /**
   * 用户收藏的作品数
   */
  collectCount: number
  /**
   * 用户账户的创建时间
   */
  createdTime: string
  /**
   * 用户邮箱
   */
  email: string
  /**
   * 用户粉丝数
   */
  fanCount: number
  /**
   * 用户的收藏夹数量
   */
  favoriteCount: number
  /**
   * 用户关注数
   */
  followCount: number
  /**
   * 用户性别，0-男，1-女，2-未知
   */
  gender: 0 | 1 | 2
  /**
   * 用户id
   */
  id: string
  /**
   * 用户喜欢的作品数
   */
  likeCount: number
  /**
   * 用户发布的原创作品数
   */
  originCount: number
  /**
   * 用户发布的转载作品数
   */
  reprintedCount: number
  /**
   * 用户签名
   */
  signature: string
  /**
   * 用户名
   */
  username: string
  /**
   * 用户是否被当前登录用户关注
   */
  isFollowed: boolean
}

export interface IRefreshTokenRes {
  access_token: string
  refresh_token: string
}

export interface ILoginRes {
  userInfo: UserDetailInfo
  accessToken: string
  refreshToken: string
}
// #endregion
