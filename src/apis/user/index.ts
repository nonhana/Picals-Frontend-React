import request from '@/service'
import {
  IChangeEmailReq,
  IChangePasswordReq,
  IFavoriteActionsReq,
  ILoginReq,
  ILoginRes,
  IRefreshTokenReq,
  IRefreshTokenRes,
  IRegisterReq,
  IUpdateUserInfoReq,
  UserDetailInfo,
} from './types'
import {
  FavoriteItem,
  Id,
  Keyword,
  LabelItem,
  Pagination,
  UserItem,
  ViewHistoryItem,
  WorkNormalItem,
  Email,
} from '../types'

// 根据 refreshToken 获取新的 token
export const refreshTokenAPI = (params: IRefreshTokenReq) => {
  return request<IRefreshTokenReq, IRefreshTokenRes>({
    url: '/api/user/refresh-token',
    method: 'GET',
    params,
  })
}

// 发送邮箱验证码
export const sendEmailCodeAPI = (params: Email) => {
  return request<Email, undefined>({
    url: '/api/user/register-captcha',
    method: 'GET',
    params,
  })
}

// 用户注册
export const registerAPI = (data: IRegisterReq) => {
  return request<IRegisterReq, undefined>({
    url: '/api/user/register',
    method: 'POST',
    data,
  })
}

// 用户登录
export const loginAPI = (params: ILoginReq) => {
  return request<ILoginReq, ILoginRes>({
    url: '/api/user/login',
    method: 'GET',
    params,
  })
}

// 获取用户详细信息
export const getUserDetailAPI = (params: Id) => {
  return request<Id, UserDetailInfo>({
    url: '/api/user/detail',
    method: 'GET',
    params,
  })
}

// 获取用户简要信息
export const getUserSimpleAPI = (params: Id) => {
  return request<Id, UserItem>({
    url: '/api/user/simple',
    method: 'GET',
    params,
  })
}

// 更新用户信息
export const updateUserInfoAPI = (data: IUpdateUserInfoReq) => {
  return request<IUpdateUserInfoReq, undefined>({
    url: '/api/user/update',
    method: 'POST',
    data,
  })
}

// 修改密码
export const changePasswordAPI = (data: IChangePasswordReq) => {
  return request<IChangePasswordReq, undefined>({
    url: '/api/user/change-password',
    method: 'POST',
    data,
  })
}

// 修改邮箱
export const changeEmailAPI = (data: IChangeEmailReq) => {
  return request<IChangeEmailReq, undefined>({
    url: '/api/user/change-email',
    method: 'POST',
    data,
  })
}

// 获取用户收藏夹列表
export const getUserFavoriteListAPI = (params?: Id) => {
  return request<Id, FavoriteItem[]>({
    url: '/api/user/favorite-list',
    method: 'GET',
    params,
  })
}

// 获取用户的历史记录列表
export const getUserHistoryListAPI = (params: Pagination) => {
  return request<Pagination, ViewHistoryItem[]>({
    url: '/api/user/history-list',
    method: 'GET',
    params,
  })
}

// 获取用户喜欢的标签列表
export const getUserLikeTagListAPI = (params?: Id) => {
  return request<Id, LabelItem[]>({
    url: '/api/user/like-labels',
    method: 'GET',
    params,
  })
}

// 添加/移除用户喜欢的标签
export const tagActionsAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/user/like-label-actions',
    method: 'POST',
    data,
  })
}

// 关注/取关用户
export const userActionsAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/user/follow-action',
    method: 'POST',
    data,
  })
}

// 分页获取正在关注的用户列表
export const getFollowingListAPI = (params: Pagination) => {
  return request<Pagination, UserItem[]>({
    url: '/api/user/following',
    method: 'GET',
    params,
  })
}

// 获取用户正在关注的用户总数
export const getFollowingTotalAPI = (params?: Id) => {
  return request<Id, number>({
    url: '/api/user/following-count',
    method: 'GET',
    params,
  })
}

// 分页获取用户的粉丝列表
export const getFansListAPI = (params: Pagination) => {
  return request<Pagination, UserItem[]>({
    url: '/api/user/fans',
    method: 'GET',
    params,
  })
}

// 获取用户的粉丝总数
export const getFansTotalAPI = (params?: Id) => {
  return request<Id, number>({
    url: '/api/user/fans-count',
    method: 'GET',
    params,
  })
}

// 获取用户已发布作品中所有携带的标签
export const getUserWorksTagsAPI = (params?: Id) => {
  return request<Id, LabelItem[]>({
    url: '/api/user/published-tags',
    method: 'GET',
    params,
  })
}

// 分页获取用户发布的作品列表
export const getUserWorksListAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/user/works',
    method: 'GET',
    params,
  })
}

// 获取用户发布的作品总数
export const getUserWorksTotalAPI = (params?: Id) => {
  return request<Id, number>({
    url: '/api/user/work-count',
    method: 'GET',
    params,
  })
}

// 分页获取用户喜欢的作品
export const getUserLikeWorksAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/user/like-works',
    method: 'GET',
    params,
  })
}

// 获取用户喜欢的作品总数
export const getUserLikeWorksTotalAPI = (params?: Id) => {
  return request<Id, number>({
    url: '/api/user/work-like-count',
    method: 'GET',
    params,
  })
}

// 分页搜索用户
export const searchUserAPI = (params: Pagination) => {
  return request<Pagination, UserItem[]>({
    url: '/api/user/search',
    method: 'GET',
    params,
  })
}

// 获取搜索用户总数
export const searchUserTotalAPI = (params: Keyword) => {
  return request<Keyword, number>({
    url: '/api/user/search-count',
    method: 'GET',
    params,
  })
}

// 收藏/取消收藏作品
export const favoriteActionsAPI = (data: IFavoriteActionsReq) => {
  return request<IFavoriteActionsReq, undefined>({
    url: '/api/user/collect',
    method: 'POST',
    data,
  })
}

// 喜欢/取消喜欢作品
export const likeActionsAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/user/like',
    method: 'POST',
    data,
  })
}

// 分页获取推荐用户列表
export const getRecommendUserListAPI = (params: Pagination) => {
  return request<Pagination, UserItem[]>({
    url: '/api/user/recommend-user',
    method: 'GET',
    params,
  })
}
