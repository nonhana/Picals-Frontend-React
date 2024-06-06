import request from '@/service'
import {
  FavoriteDetailInfo,
  IChangeFavoriteOrderReq,
  ICopyFavoriteWorksReq,
  IEditFavoriteReq,
  IGetSearchResultNumReq,
  IMoveFavoriteWorksReq,
  INewFavoriteReq,
} from './types'
import { Id, Pagination, WorkNormalItem } from '../types'

// 新建收藏夹
export const newFavoriteAPI = (data: INewFavoriteReq) => {
  return request<INewFavoriteReq, undefined>({
    url: '/api/favorite/new',
    method: 'POST',
    data,
  })
}

// 编辑收藏夹
export const editFavoriteAPI = (data: IEditFavoriteReq) => {
  return request<IEditFavoriteReq, undefined>({
    url: `/api/favorite/edit?id=${data.id}`,
    method: 'POST',
    data,
  })
}

// 删除收藏夹
export const deleteFavoriteAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/favorite/delete',
    method: 'POST',
    data,
  })
}

// 修改收藏夹的排序
export const changeFavoriteOrderAPI = (data: IChangeFavoriteOrderReq) => {
  return request<IChangeFavoriteOrderReq, undefined>({
    url: '/api/favorite/order',
    method: 'POST',
    data,
  })
}

// 获取收藏夹详细信息
export const getFavoriteDetailAPI = (params: Id) => {
  return request<Id, FavoriteDetailInfo>({
    url: '/api/favorite/detail',
    method: 'GET',
    params,
  })
}

// 分页获取收藏夹作品列表
export const getFavoriteWorkListAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/favorite/works',
    method: 'GET',
    params,
  })
}

// 搜索收藏夹内部的作品
export const searchFavoriteWorkAPI = (params: Pagination) => {
  return request<Pagination, WorkNormalItem[]>({
    url: '/api/favorite/search',
    method: 'GET',
    params,
  })
}

// 获取搜索结果数量
export const getSearchResultNumAPI = (params: IGetSearchResultNumReq) => {
  return request<IGetSearchResultNumReq, number>({
    url: '/api/favorite/search-count',
    method: 'GET',
    params,
  })
}

// 移动作品到其他收藏夹
export const moveFavoriteWorksAPI = (data: IMoveFavoriteWorksReq) => {
  return request<IMoveFavoriteWorksReq, undefined>({
    url: '/api/favorite/move',
    method: 'POST',
    data,
  })
}

// 复制作品到其他收藏夹
export const copyFavoriteWorksAPI = (data: ICopyFavoriteWorksReq) => {
  return request<ICopyFavoriteWorksReq, undefined>({
    url: '/api/favorite/copy',
    method: 'POST',
    data,
  })
}
