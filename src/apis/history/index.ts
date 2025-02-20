import type { HistoryItem, Id, Pagination } from '../types'

import type { IGetViewHistoryTotalReq, ISearchViewHistoryReq } from './types'
import request from '@/service'

// 分页获取用户某天的浏览历史记录
export function getViewHistoryAPI(params: Pagination) {
  return request<Pagination, HistoryItem[]>({
    url: '/api/history/list',
    method: 'GET',
    params,
  })
}

// 获取用户某天的浏览历史记录总数
export function getViewHistoryTotalAPI(params: IGetViewHistoryTotalReq) {
  return request<IGetViewHistoryTotalReq, number>({
    url: '/api/history/count',
    method: 'GET',
    params,
  })
}

// 新增用户浏览记录
export function postViewHistoryAPI(data: Id) {
  return request<Id, undefined>({
    url: '/api/history/new',
    method: 'POST',
    data,
  })
}

// 删除某条历史记录
export function deleteViewHistoryAPI(data: Id) {
  return request<Id, undefined>({
    url: '/api/history/delete',
    method: 'POST',
    data,
  })
}

// 清除全部历史记录
export function clearViewHistoryAPI() {
  return request<undefined, undefined>({
    url: '/api/history/clear',
    method: 'POST',
  })
}

// 搜索历史记录
export function searchViewHistoryAPI(params: ISearchViewHistoryReq) {
  return request<ISearchViewHistoryReq, HistoryItem[]>({
    url: '/api/history/search',
    method: 'GET',
    params,
  })
}
