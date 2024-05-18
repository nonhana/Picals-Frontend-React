import request from '@/service'
import { Id, Pagination, ViewHistoryItem } from '../types'
import { ISearchViewHistoryReq } from './types'

// 分页获取用户浏览历史记录
export const getViewHistoryAPI = (params: Pagination) => {
  return request<Pagination, ViewHistoryItem[]>({
    url: '/api/history/list',
    method: 'GET',
    params,
  })
}

// 新增用户浏览记录
export const postViewHistoryAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/history/new',
    method: 'POST',
    data,
  })
}

// 删除某条历史记录
export const deleteViewHistoryAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/history/delete',
    method: 'POST',
    data,
  })
}

// 清除全部历史记录
export const clearViewHistoryAPI = () => {
  return request<undefined, undefined>({
    url: '/api/history/clear',
    method: 'POST',
  })
}

// 搜索历史记录
export const searchViewHistoryAPI = (params: ISearchViewHistoryReq) => {
  return request<ISearchViewHistoryReq, ViewHistoryItem[]>({
    url: '/api/history/search',
    method: 'GET',
    params,
  })
}