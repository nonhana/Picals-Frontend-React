import request from '@/service'
import { LabelDetailInfo, INewLabelReq } from './types'
import { Id, LabelItem } from '../types'

// 新建标签
export const newLabelAPI = (data: INewLabelReq) => {
  return request<INewLabelReq, undefined>({
    url: '/api/label/new',
    method: 'POST',
    data,
  })
}

// 获取推荐标签列表
export const getRecommendLabelListAPI = () => {
  return request<undefined, LabelItem[]>({
    url: '/api/label/recommend',
    method: 'GET',
  })
}

// 获取某个标签的详细信息
export const getLabelDetailAPI = (params: Id) => {
  return request<Id, LabelDetailInfo>({
    url: '/api/label/detail',
    method: 'GET',
    params,
  })
}
