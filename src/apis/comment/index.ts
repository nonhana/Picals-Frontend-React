import type { Id } from '../types'

import type { CommentItem, IPostCommentReq } from './types'
import request from '@/service'

// 获取某个作品的评论列表
export function getCommentListAPI(params: Id) {
  return request<Id, CommentItem[]>({
    url: '/api/comment/list',
    method: 'GET',
    params,
  })
}

// 发布某个作品的评论
export function postCommentAPI(data: IPostCommentReq) {
  return request<IPostCommentReq, undefined>({
    url: '/api/comment/new',
    method: 'POST',
    data,
  })
}

// 删除某条评论
export function deleteCommentAPI(data: Id) {
  return request<Id, undefined>({
    url: '/api/comment/delete',
    method: 'POST',
    data,
  })
}
