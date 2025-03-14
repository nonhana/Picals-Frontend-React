import type { Id, Pagination, WorkNormalItem } from '../types'

import type {
  IEditWorkReq,
  IGetRandomBackgroundsReq,
  IGetRandomBackgroundsRes,
  ISearchWorksIdListReq,
  IUploadWorkReq,
  WorkDetailInfo,
} from './types'
import request from '@/service'

// 分页获取推荐作品列表
export function getRecommendWorksAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/recommend',
    method: 'GET',
    params,
  })
}

// 分页获取最新作品列表
export function getLatestWorksAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/latest',
    method: 'GET',
    params,
  })
}

// 获取已关注用户新作
export function getFollowNewWorksAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/following',
    method: 'GET',
    params,
  })
}

// 获取已关注用户新作总数
export function getFollowNewWorksTotalAPI() {
  return request<undefined, number>({
    url: '/api/illustration/following-count',
    method: 'GET',
  })
}

// 获取已关注用户新作id列表
export function getFollowNewWorksIdListAPI() {
  return request<undefined, string[]>({
    url: '/api/illustration/following-id',
    method: 'GET',
  })
}

// 上传作品
export function uploadWorkAPI(data: IUploadWorkReq) {
  return request<IUploadWorkReq, undefined>({
    url: '/api/illustration/upload',
    method: 'POST',
    data,
  })
}

// 编辑作品
export function editWorkAPI(data: IEditWorkReq) {
  return request<IEditWorkReq, undefined>({
    url: '/api/illustration/edit',
    method: 'POST',
    params: {
      id: data.id,
    },
    data,
  })
}

// 删除作品
export function deleteWorkAPI(params: Id) {
  return request<Id, undefined>({
    url: '/api/illustration/delete',
    method: 'POST',
    params,
  })
}

// 获取某个作品的详细信息
export function getWorkDetailAPI(params: Id) {
  return request<Id, WorkDetailInfo>({
    url: '/api/illustration/detail',
    method: 'GET',
    params,
  })
}

// 获取某个作品的简要信息
export function getWorkSimpleAPI(params: Id) {
  return request<Id, WorkNormalItem>({
    url: '/api/illustration/simple',
    method: 'GET',
    params,
  })
}

// 根据标签分页搜索作品
export function searchWorksByLabelAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/search',
    method: 'GET',
    params,
  })
}

// 获取搜索作品id列表
export function searchWorksIdListAPI(params: ISearchWorksIdListReq) {
  return request<ISearchWorksIdListReq, string[]>({
    url: '/api/illustration/search-id',
    method: 'GET',
    params,
  })
}

// 新增作品浏览量
export function addWorkViewAPI(params: Id) {
  return request<Id, undefined>({
    url: '/api/illustration/view',
    method: 'POST',
    params,
  })
}

// 获取随机背景图片列表
export function getRandomBackgroundsAPI(data: IGetRandomBackgroundsReq) {
  return request<IGetRandomBackgroundsReq, IGetRandomBackgroundsRes>({
    url: '/api/illustration/background',
    method: 'POST',
    data,
  })
}

// 获取数据库内部作品总数
export function getWorkCountAPI() {
  return request<undefined, number>({
    url: '/api/illustration/work-count',
    method: 'GET',
  })
}
