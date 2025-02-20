import type { Keyword, LabelItem, Name, Pagination } from '../types'

import type { INewLabelReq, LabelDetailInfo } from './types'
import request from '@/service'

// 新建标签
export function newLabelAPI(data: INewLabelReq[]) {
  return request<INewLabelReq[], undefined>({
    url: '/api/label/new',
    method: 'POST',
    data,
  })
}

// 搜索标签
export function searchLabelsAPI(params: Keyword) {
  return request<Keyword, LabelItem[]>({
    url: '/api/label/search',
    method: 'GET',
    params,
  })
}

// 获取推荐标签列表
export function getRecommendLabelListAPI() {
  return request<undefined, LabelItem[]>({
    url: '/api/label/recommend',
    method: 'GET',
  })
}

// 分页获取标签列表
export function getLabelsInPagesAPI(params: Pagination) {
  return request<Pagination, LabelItem[]>({
    url: '/api/label/list',
    method: 'GET',
    params,
  })
}

// 获取某个标签的详细信息
export function getLabelDetailAPI(params: Name) {
  return request<Name, LabelDetailInfo | null>({
    url: '/api/label/detail',
    method: 'GET',
    params,
  })
}
