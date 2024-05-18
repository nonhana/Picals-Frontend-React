import request from '@/service'
import { Id, Pagination, WorkNormalItem } from '../types'
import { IEditWorkReq, IUploadWorkReq } from './types'
import { WorkDetailInfo } from '@/utils/types'

// 分页获取推荐作品列表
export const getRecommendWorksAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/recommend',
    method: 'GET',
    params,
  })
}

// 获取已关注用户新作
export const getFollowNewWorksAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/following',
    method: 'GET',
    params,
  })
}

// 获取昨日排行榜作品
export const getRankWorksAPI = () => {
  return request<undefined, WorkNormalItem[]>({
    url: '/api/illustration/rank',
    method: 'GET',
  })
}

// 上传作品
export const uploadWorkAPI = (data: IUploadWorkReq) => {
  return request<IUploadWorkReq, undefined>({
    url: '/api/illustration/upload',
    method: 'POST',
    data,
  })
}

// 编辑作品
export const editWorkAPI = (data: IEditWorkReq) => {
  return request<IEditWorkReq, undefined>({
    url: '/api/illustration/edit',
    method: 'POST',
    params: {
      id: data.id,
    },
    data,
  })
}

// 获取某个作品的详细信息
export const getWorkDetailAPI = (params: Id) => {
  return request<Id, WorkDetailInfo>({
    url: '/api/illustration/detail',
    method: 'GET',
    params,
  })
}

// 根据标签分页搜索作品
export const searchWorksByTagAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustration/search',
    method: 'GET',
    params,
  })
}