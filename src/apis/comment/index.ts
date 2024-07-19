import request from '@/service'
import { Id } from '../types'
import { CommentItem, IPostCommentReq } from './types'

// 获取某个作品的评论列表
export const getCommentListAPI = (params: Id) => {
  return request<Id, CommentItem[]>({
    url: '/api/comment/list',
    method: 'GET',
    params,
  })
}

// 发布某个作品的评论
export const postCommentAPI = (data: IPostCommentReq) => {
  return request<IPostCommentReq, undefined>({
    url: '/api/comment/new',
    method: 'POST',
    data,
  })
}

// 删除某条评论
export const deleteCommentAPI = (data: Id) => {
  return request<Id, undefined>({
    url: '/api/comment/delete',
    method: 'POST',
    data,
  })
}
