// src/apis/comment/types.ts
// 定义 comment 模块的 API 类型

// #region 请求体类型
export interface IPostCommentReq {
  /**
   * 评论内容
   */
  content: string
  /**
   * 作品id
   */
  id: string
  /**
   * 回复信息
   */
  replyInfo?: {
    /**
     * 回复的评论id，如果是回复一级评论，这个id为被回复的评论的id；
     * 如果是回复二级评论，这个id为被回复的评论的父评论id。
     */
    replyCommentId: string
    /**
     * 回复的用户id，仅针对对二级评论的回复，需要带上回复的用户id
     */
    replyUserId?: string
  }
}
// # endregion

// #region 响应体类型
export interface CommentItem {
  /**
   * 评论作者信息
   */
  authorInfo: CommentItemAuthorInfo
  /**
   * 子评论列表
   */
  childComments: ChildCommentElement[]
  /**
   * 评论内容
   */
  content: string
  /**
   * 评论创建日期
   */
  createdAt: string
  /**
   * 评论id
   */
  id: string
  /**
   * 评论等级，0-一级评论，1-二级评论
   */
  level: number
  /**
   * 回复的用户信息
   */
  replyTo?: CommentItemReplyTo
}

export interface CommentItemAuthorInfo {
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户id
   */
  id: string
  /**
   * 用户名
   */
  username: string
}

export interface ChildCommentElement {
  /**
   * 评论作者信息
   */
  authorInfo: ChildCommentAuthorInfo
  /**
   * 子评论列表
   */
  childComments: ChildCommentElement[]
  /**
   * 评论内容
   */
  content: string
  /**
   * 评论创建日期
   */
  createdAt: string
  /**
   * 评论id
   */
  id: string
  /**
   * 评论等级，0-一级评论，1-二级评论
   */
  level: number
  /**
   * 回复的用户信息
   */
  replyTo?: ChildCommentReplyTo
}

export interface ChildCommentAuthorInfo {
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户id
   */
  id: string
  /**
   * 用户名
   */
  username: string
}

export interface ChildCommentReplyTo {
  /**
   * 用户id
   */
  id: string
  /**
   * 用户名
   */
  username: string
}

export interface CommentItemReplyTo {
  /**
   * 用户id
   */
  id: string
  /**
   * 用户名
   */
  username: string
}
// # endregion
