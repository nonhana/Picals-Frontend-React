// src/apis/user/types.ts
// 定义 user 模块的 API 类型

// #region 请求体类型
export interface IRefreshTokenReq {
  refreshToken: string
}
// #endregion

// #region 返回体类型
export interface IRefreshTokenRes {
  accessToken: string
  refreshToken: string
}
// #endregion
