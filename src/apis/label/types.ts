// src/apis/label/types.ts
// 定义 label 模块的 API 类型

// #region 请求体类型
export interface INewLabelReq {
  value: string
}
// #endregion

// #region 响应体类型
export interface LabelDetailInfo {
  /**
   * 标签颜色，由后台进行随机不重复的颜色生成
   */
  color: string
  /**
   * 标签id
   */
  id: string
  /**
   * 标签封面图片，当该标签的作品数达到一定量级后，由管理员在后台进行上传，默认就是随机生成的纯色背景图
   */
  img: string
  /**
   * 是否是我喜欢的标签
   */
  isMyLike: string
  /**
   * 标签名称
   */
  name: string
  /**
   * 该标签下的作品总数
   */
  workCount: string
}
// #endregion
