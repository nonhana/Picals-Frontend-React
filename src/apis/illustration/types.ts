// src/apis/illustration/types.ts
// 定义 illustration 模块的 API 类型

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
    /**
     * 作品原链接
     */
    workUrl: string
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
   * 是否转载
   */
  isReprinted: boolean
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
}

export interface IEditWorkReq extends Partial<IUploadWorkReq> {
  id: string
}
// #endregion
