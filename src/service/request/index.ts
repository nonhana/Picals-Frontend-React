import axios from 'axios'
import { notification } from 'antd'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors, CreateRequestConfig } from './types'
import { refreshTokenAPI } from '@/apis/user'

interface PendingTask {
  config: AxiosRequestConfig
  resolve: (value: unknown) => void
}
let refreshing = false
const pendingTasks: PendingTask[] = [] // 维护一个请求队列，用于刷新token时重新发起请求

class Request {
  instance: AxiosInstance // axios实例

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config) // 传入配置，创建axios实例

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (err) => Promise.reject(err),
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      async (err) => {
        if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
          notification.error({
            message: '请求超时',
            description: '请求超时，请检查网络',
          })
          Promise.reject(err)
        } else {
          const { status, data, config } = err.response

          if (refreshing) {
            return new Promise((resolve) => {
              pendingTasks.push({ config, resolve })
            })
          }

          if (status === 500) {
            notification.error({
              message: '服务器错误',
              description: data.message || '未知错误',
            })
          } else if (status === 404) {
            window.location.href = '/404'
          } else if (status === 401 && !config.url.includes('/user/refresh-token')) {
            try {
              refreshing = true
              const refreshToken = localStorage.getItem('refresh_token')
              const { data } = await refreshTokenAPI({ refreshToken: refreshToken! })
              localStorage.setItem('access_token', data.accessToken)
              localStorage.setItem('refresh_token', data.refreshToken)
            } catch (error) {
              notification.error({
                message: 'token已失效，请重新进行登录~',
              })
            } finally {
              refreshing = false
            }
          } else if (status === 400) {
            notification.error({
              message: '客户端错误',
              description: data.message || '未知错误',
            })
          }
          Promise.reject(err)
        }
      },
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res) // 将res放到拦截器中处理完后再返回
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default Request
export type { RequestConfig, RequestInterceptors }
