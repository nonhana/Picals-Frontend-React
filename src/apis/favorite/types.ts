// src/apis/favorite/types.ts
// 定义 favorite 模块的 API 类型

// #region 请求体类型
export interface INewFavoriteReq {
  /**
   * 收藏夹封面，可以不传，不传的时候默认把最新的作品的第一张图当作封面
   */
  cover?: string
  /**
   * 收藏夹简介
   */
  intro: string
  /**
   * 收藏夹名称
   */
  name: string
}

export interface IEditFavoriteReq extends Partial<INewFavoriteReq> {
  id: string
}

export interface IChangeFavoriteOrderReq {
  orderList: {
    /**
     * 收藏夹id
     */
    id: string
    /**
     * 收藏夹顺序
     */
    order: number
  }[]
}

export interface IMoveWorkToFavoriteReq {
  /**
   * 要移动到的收藏夹id
   */
  id: string
  /**
   * 选中的作品id列表
   */
  workIdList: string[]
}

export interface IGetSearchResultNumReq {
  keyword: string
  favoriteId: string
}
// # endregion

// #region 响应体类型
export interface FavoriteDetailInfo {
  /**
   * 收藏夹封面
   */
  cover: null | string
  /**
   * 创建者id
   */
  creatorId: string
  /**
   * 创建者名称
   */
  creatorName: string
  /**
   * 收藏夹id
   */
  id: string
  /**
   * 收藏夹简介
   */
  intro: string
  /**
   * 收藏夹名称
   */
  name: string
  /**
   * 收藏夹作品总数
   */
  workNum: number
}
// #endregion
