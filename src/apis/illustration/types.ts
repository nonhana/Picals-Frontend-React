// src/apis/illustration/types.ts
// 定义 illustration 模块的 API 类型

import { ImageItem, LabelItem } from '../types'

// #region 请求体类型
export interface IUploadWorkReq {
  /**
   * 作品原插画家信息，转载作品需要填写
   */
  illustratorInfo?: {
    /**
     * 作者主页
     */
    homeUrl: string
    /**
     * 作者名，名称
     */
    name: string
  }
  /**
   * 图片列表
   */
  imgList: string[]
  /**
   * 作品简介
   */
  intro: string
  /**
   * 是否是AI生成作品
   */
  isAIGenerated: boolean
  /**
   * 转载类型。0-原创，1-转载，2-合集
   */
  reprintType: number
  /**
   * 作品标签列表，单纯的以标签名列表的形式传入
   */
  labels: string[]
  /**
   * 作品名
   */
  name: string
  /**
   * 是否开启评论
   */
  openComment: boolean
  /**
   * 作品原链接
   */
  workUrl?: string
}

export interface IEditWorkReq extends Partial<IUploadWorkReq> {
  id: string
}

export interface ISearchWorksIdListReq {
  labelName: string
  sortType: string
}

export interface IGetRandomBackgroundsReq {
  /**
   * 选取过的背景图片的所属作品的index列表，以确保每一次请求的背景图片不会重复
   */
  chosenIdList: number[]
}
// #endregion

// #region 响应体类型
export interface WorkDetailInfo {
  /**
   * 作者id
   */
  authorId: string
  /**
   * 被收藏次数
   */
  collectNum: number
  /**
   * 评论个数
   */
  commentNum: number
  /**
   * 创建日期
   */
  createdDate: string
  /**
   * 作品id
   */
  id: string
  /**
   * 作品图片url列表
   */
  imgList: string[]
  /**
   * 图片详细信息列表
   */
  images: ImageItem[]
  /**
   * 作品简介
   */
  intro: string
  /**
   * 是否是AI生成作品
   */
  isAIGenerated: boolean
  /**
   * 是否已经收藏
   */
  isCollected: boolean
  /**
   * 已经被收藏的收藏夹id，如果没有被收藏则不传
   */
  favoriteId?: string
  /**
   * 用户是否已经喜欢
   */
  isLiked: boolean
  /**
   * 是否是转载作品
   */
  reprintType: number
  /**
   * 标签列表
   */
  labels: LabelItem[]
  /**
   * 被喜欢次数
   */
  likeNum: number
  /**
   * 作品名称
   */
  name: string
  /**
   * 是否打开评论
   */
  openComment: boolean
  /**
   * 更新日期
   */
  updatedDate: string
  /**
   * 被浏览次数
   */
  viewNum: number
  /**
   * 原作品地址（转载作品）
   */
  workUrl?: string
  /**
   * 插画家信息（转载作品）
   */
  illustrator?: {
    id: string
    name: string
    intro: string
    avatar: string
    homeUrl: string
    workCount: number
  }
}

export interface IGetRandomBackgroundsRes {
  result: string[]
  chosenIdList: number[]
}
// #endregion
