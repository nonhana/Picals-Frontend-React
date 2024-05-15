import Request from './request'
import type { RequestConfig } from './request/types'

/**
 * @description: 后端返回数据类型
 * @template T 返回数据体的类型
 */
export interface DEVResponse<T> {
  /**
   * 状态码
   */
  code: number
  /**
   * 状态信息
   */
  message: string
  /**
   * 返回数据体，类型取决于传入的泛型。如果没有返回数据，为undefined
   */
  data: T
}

// 定义请求类型
interface DEVRequestConfig<T, R> extends RequestConfig<DEVResponse<R>> {
  data?: T
}

// 创建axios的实例
const request = new Request({
  baseURL: '',
  timeout: 1000 * 60 * 5, // 超时时间5分钟
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 响应拦截器
    responseInterceptors: (result) => {
      return result
    },
  },
})

/**
 * @description: 封装请求函数
 * @generic D 请求参数的类型，默认为any
 * @generic T 响应结构的类型，默认为any
 * @param {DEVRequestConfig} config 定义请求类型
 * @returns {Promise}
 */
const devRequest = <D = any, T = any>(config: DEVRequestConfig<D, T>): Promise<DEVResponse<T>> => {
  return request.request<DEVResponse<T>>(config)
}

// 向外暴露devRequest，供API调用
export default devRequest
