import request from '@/service'
import { IEditIllustratorReq, INewIllustratorReq, IllustratorInfo } from './types'
import { Id, Pagination, WorkNormalItem } from '../types'

// 新建插画家
export const newIllustratorAPI = (data: INewIllustratorReq) => {
  return request<INewIllustratorReq, undefined>({
    url: '/api/illustrator/new',
    method: 'POST',
    data,
  })
}

// 修改插画家信息
export const editIllustratorAPI = (data: IEditIllustratorReq) => {
  return request<IEditIllustratorReq, undefined>({
    url: `/api/illustrator/edit?id=${data.id}`,
    method: 'POST',
    data,
  })
}

// 获取插画家详细信息
export const getIllustratorDetailAPI = (params: Id) => {
  return request<Id, IllustratorInfo>({
    url: '/api/illustrator/detail',
    method: 'GET',
    params,
  })
}

// 分页获取某插画家的作品列表
export const getIllustratorWorksAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustrator/works',
    method: 'GET',
    params,
  })
}
