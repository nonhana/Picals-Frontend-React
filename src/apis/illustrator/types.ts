// src/apis/illustrator/types.ts
// 定义 illustrator 模块的 API 类型

// #region 请求体类型
export interface INewIllustratorReq {
  /**
   * 插画家头像
   */
  avatar?: string
  /**
   * 插画家个人主页，如转载 pixiv 的插画家，需要填写作者的个人主页url
   */
  homeUrl: string
  /**
   * 插画家介绍
   */
  intro?: string
  /**
   * 插画家名称
   */
  name: string
}

export interface IEditIllustratorReq extends Partial<INewIllustratorReq> {
  id: string
}
// #endregion

// #region 响应体类型
export interface IllustratorInfo {
  /**
   * 插画家头像
   */
  avatar: string | null
  /**
   * 创建日期
   */
  createdAt: string
  /**
   * 插画家id
   */
  id: string
  /**
   * 插画家介绍
   */
  intro: string
  /**
   * 插画家名称
   */
  name: string
  /**
   * 更新日期
   */
  updatedAt: string
  /**
   * 作品总数
   */
  workNum: number
  /**
   * 插画家个人主页
   */
  homeUrl: string
}
// #endregion
