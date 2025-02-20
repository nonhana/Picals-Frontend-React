import type { Id, Keyword, Pagination, WorkNormalItem } from '../types'

import type { IEditIllustratorReq, IllustratorInfo, INewIllustratorReq } from './types'
import request from '@/service'

// 新建插画家
export function newIllustratorAPI(data: INewIllustratorReq) {
  return request<INewIllustratorReq, undefined>({
    url: '/api/illustrator/new',
    method: 'POST',
    data,
  })
}

// 修改插画家信息
export function editIllustratorAPI(data: IEditIllustratorReq) {
  return request<IEditIllustratorReq, undefined>({
    url: `/api/illustrator/edit?id=${data.id}`,
    method: 'POST',
    data,
  })
}

// 获取某个插画家详细信息
export function getIllustratorDetailAPI(params: Id) {
  return request<Id, IllustratorInfo>({
    url: '/api/illustrator/detail',
    method: 'GET',
    params,
  })
}

// 分页获取插画家列表
export function getIllustratorListInPagesAPI(params: Pagination) {
  return request<Pagination, IllustratorInfo[]>({
    url: '/api/illustrator/list',
    method: 'GET',
    params,
  })
}

// 搜索插画家
export function searchIllustratorsAPI(params: Keyword) {
  return request<Keyword, IllustratorInfo[]>({
    url: '/api/illustrator/search',
    method: 'GET',
    params,
  })
}

// 分页获取某插画家的作品列表
export function getIllustratorWorksInPagesAPI(params: Pagination) {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/illustrator/works',
    method: 'GET',
    params,
  })
}

// 获取某插画家的作品id列表
export function getIllustratorWorksIdListAPI(params: Id) {
  return request<Id, string[]>({
    url: '/api/illustrator/works-id',
    method: 'GET',
    params,
  })
}
