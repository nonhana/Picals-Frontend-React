// src/apis/history/types.ts
// 定义 history 模块的 API 类型

// #region 请求体类型
export interface IGetViewHistoryTotalReq {
  date: string // 当前的日期，以 YYYY-MM-DD 格式表示
}

export interface ISearchViewHistoryReq {
  keyword: string
}
// # endregion
