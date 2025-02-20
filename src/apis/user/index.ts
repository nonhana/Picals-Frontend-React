import type {
  Email,
  FavoriteItem,
  Id,
  Keyword,
  LabelItem,
  Pagination,
  UserItem,
  WorkNormalItem,
} from '../types'

import type {
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
import request from '@/service'

// 根据 refreshToken 获取新的 token
export function refreshTokenAPI(params: IRefreshTokenReq) {
  return request<IRefreshTokenReq, IRefreshTokenRes>({
    url: '/api/user/refresh-token',
    method: 'GET',
    params,
  })
}

// 发送邮箱验证码
export function sendEmailCodeAPI(params: Email) {
  return request<Email, undefined>({
    url: '/api/user/register-captcha',
    method: 'GET',
    params,
  })
}

// 用户注册
export function registerAPI(data: IRegisterReq) {
  return request<IRegisterReq, undefined>({
    url: '/api/user/register',
    method: 'POST',
    data,
  })
}

// 用户登录
export function loginAPI(params: ILoginReq) {
  return request<ILoginReq, ILoginRes>({
    url: '/api/user/login',
    method: 'GET',
    params,
  })
}

// 获取用户详细信息
export function getUserDetailAPI(params: Id) {
  return request<Id, UserDetailInfo>({
    url: '/api/user/detail',
    method: 'GET',
    params,
  })
}

// 获取用户简要信息
export function getUserSimpleAPI(params: Id) {
  return request<Id, UserItem>({
    url: '/api/user/simple',
    method: 'GET',
    params,
  })
}

// 更新用户信息
export function updateUserInfoAPI(data: IUpdateUserInfoReq) {
  return request<IUpdateUserInfoReq, undefined>({
    url: '/api/user/update',
    method: 'POST',
    data,
  })
}

// 修改密码
export function changePasswordAPI(data: IChangePasswordReq) {
  return request<IChangePasswordReq, undefined>({
    url: '/api/user/change-password',
    method: 'POST',
    data,
  })
}

// 修改邮箱
export function changeEmailAPI(data: IChangeEmailReq) {
  return request<IChangeEmailReq, undefined>({
    url: '/api/user/change-email',
    method: 'POST',
    data,
  })
}

// 获取用户收藏夹列表
export function getUserFavoriteListAPI(params: Id) {
  return request<Id, FavoriteItem[]>({
    url: '/api/user/favorites',
    method: 'GET',
    params,
  })
}

// 获取用户喜欢的标签列表
export function getUserLikeTagListAPI(params?: Id) {
  return request<Id, LabelItem[]>({
    url: '/api/user/like-labels',
    method: 'GET',
    params,
  })
}

// 添加/移除用户喜欢的标签
export function labelActionsAPI(data: Id) {
  return request<Id, undefined>({
    url: '/api/user/like-label-actions',
    method: 'POST',
    data,
  })
}

// 关注/取关用户
export function userActionsAPI(data: Id) {
  return request<Id, undefined>({
    url: '/api/user/follow-action',
    method: 'POST',
    data,
  })
}

// 分页获取正在关注的用户列表
export function getFollowingListAPI(params: Pagination) {
  return request<Pagination, UserItem[]>({
    url: '/api/user/following',
    method: 'GET',
    params,
  })
}

// 获取用户正在关注的用户总数
export function getFollowingTotalAPI(params?: Id) {
  return request<Id, number>({
    url: '/api/user/following-count',
    method: 'GET',
    params,
  })
}

// 分页获取用户的粉丝列表
export function getFansListAPI(params: Pagination) {
  return request<Pagination, UserItem[]>({
    url: '/api/user/followers',
    method: 'GET',
    params,
  })
}

// 获取用户的粉丝总数
export function getFansTotalAPI(params?: Id) {
  return request<Id, number>({
    url: '/api/user/followers-count',
    method: 'GET',
    params,
  })
}

// 获取用户已发布作品中所有携带的标签
export function getUserWorksLabelsAPI(params?: Id) {
  return request<Id, LabelItem[]>({
    url: '/api/user/published-labels',
    method: 'GET',
    params,
  })
}

// 分页获取用户发布的作品列表
export function getUserWorksListAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/user/works',
    method: 'GET',
    params,
  })
}

// 获取用户发布的作品id列表
export function getUserWorksIdListAPI(params: Id) {
  return request<Id, string[]>({
    url: '/api/user/works-id',
    method: 'GET',
    params,
  })
}

// 获取用户发布的作品总数
export function getUserWorksTotalAPI(params?: Id) {
  return request<Id, number>({
    url: '/api/user/works-count',
    method: 'GET',
    params,
  })
}

// 分页获取用户喜欢的作品
export function getUserLikeWorksAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/user/like-works',
    method: 'GET',
    params,
  })
}

// 获取用户喜欢的作品id列表
export function getUserLikeWorksIdListAPI(params: Id) {
  return request<Id, string[]>({
    url: '/api/user/like-works-id',
    method: 'GET',
    params,
  })
}

// 获取用户喜欢的作品总数
export function getUserLikeWorksTotalAPI(params?: Id) {
  return request<Id, number>({
    url: '/api/user/like-works-count',
    method: 'GET',
    params,
  })
}

// 分页搜索用户
export function searchUserAPI(params: Pagination) {
  return request<Pagination, UserItem[]>({
    url: '/api/user/search',
    method: 'GET',
    params,
  })
}

// 获取搜索用户总数
export function searchUserTotalAPI(params: Keyword) {
  return request<Keyword, number>({
    url: '/api/user/search-count',
    method: 'GET',
    params,
  })
}

// 收藏/取消收藏作品
export function favoriteActionsAPI(data: IFavoriteActionsReq) {
  return request<IFavoriteActionsReq, undefined>({
    url: '/api/user/collect',
    method: 'POST',
    data,
  })
}

// 喜欢/取消喜欢作品
export function likeActionsAPI(data: Id) {
  return request<Id, undefined>({
    url: '/api/user/like',
    method: 'POST',
    data,
  })
}

// 分页获取推荐用户列表
export function getRecommendUserListAPI(params: Pagination) {
  return request<Pagination, UserItem[]>({
    url: '/api/user/recommend-user',
    method: 'GET',
    params,
  })
}
