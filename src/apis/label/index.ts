import request from '@/service'

import { LabelDetailInfo, INewLabelReq } from './types'
import { Keyword, LabelItem, Name, Pagination } from '../types'

// 新建标签
export const newLabelAPI = (data: INewLabelReq[]) => {
  return request<INewLabelReq[], undefined>({
    url: '/api/label/new',
    method: 'POST',
    data,
  })
}

// 搜索标签
export const searchLabelsAPI = (params: Keyword) => {
  return request<Keyword, LabelItem[]>({
    url: '/api/label/search',
    method: 'GET',
    params,
  })
}

// 获取推荐标签列表
export const getRecommendLabelListAPI = () => {
  return request<undefined, LabelItem[]>({
    url: '/api/label/recommend',
    method: 'GET',
  })
}

// 分页获取标签列表
export const getLabelsInPagesAPI = (params: Pagination) => {
  return request<Pagination, LabelItem[]>({
    url: '/api/label/list',
    method: 'GET',
    params,
  })
}

// 获取某个标签的详细信息
export const getLabelDetailAPI = (params: Name) => {
  return request<Name, LabelDetailInfo | null>({
    url: '/api/label/detail',
    method: 'GET',
    params,
  })
}
